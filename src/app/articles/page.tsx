import { Suspense } from "react";
import { getArticleFilterOptions, getArticles } from "@/lib/api";
import ArticleBaseSkeleton from "@/ui/articles/ArticleBaseSkeleton";
import ArticleContainer from "@/ui/articles/ArticleContainer";
import ArticleFilters from "@/ui/articles/ArticleFilters";
import PageContainer from "@/ui/shared/PageContainer";
import Pagination from "@/ui/shared/Pagination";
import PaginationSkeleton from "@/ui/shared/skeletons/PaginationSkeleton";
import Skeleton from "@/ui/shared/skeletons/Skeleton";

type SearchParams = Record<string, string | string[] | undefined>;

type PageProps = {
    searchParams?: Promise<SearchParams> | SearchParams;
};

type SortType = "newest" | "oldest" | "popular";

type ArticleQueryState = {
    q: string;
    category: string;
    duration: string;
    tags: string;
    sort: SortType;
    page: number;
};

const RESULTS_PAGE_SIZE = 6;

function getSingleValue(value: string | string[] | undefined) {
    if (Array.isArray(value)) return value[0] ?? "";
    return value ?? "";
}

function getPositivePage(value: string, fallback = 1) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed < 1) return fallback;
    return parsed;
}

function normalizeSort(value: string): SortType {
    if (value === "oldest" || value === "popular" || value === "newest") {
        return value;
    }
    return "newest";
}

function parseQueryState(searchParams: SearchParams): ArticleQueryState {
    return {
        q: getSingleValue(searchParams.q).trim(),
        category: getSingleValue(searchParams.category).trim(),
        duration: getSingleValue(searchParams.duration).trim(),
        tags: getSingleValue(searchParams.tags).trim(),
        sort: normalizeSort(getSingleValue(searchParams.sort).trim()),
        page: getPositivePage(getSingleValue(searchParams.page), 1)
    };
}

function toPaginationQuery(queryState: ArticleQueryState) {
    return {
        q: queryState.q || undefined,
        category: queryState.category || undefined,
        duration: queryState.duration || undefined,
        tags: queryState.tags || undefined,
        sort: queryState.sort || undefined
    };
}

function getResultsKey(queryState: ArticleQueryState) {
    return [
        queryState.q,
        queryState.category,
        queryState.duration,
        queryState.tags,
        queryState.sort,
        String(queryState.page)
    ].join("|");
}

function ArticlesResultsSkeleton() {
    return (
        <div className="flex-1 flex flex-col gap-8">
            <Skeleton className="h-5 w-48" />
            <div className="flex flex-col gap-8">
                {Array.from({ length: RESULTS_PAGE_SIZE }).map((_, index) => (
                    <div key={`articles-results-skeleton-${index}`} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                        <ArticleBaseSkeleton />
                    </div>
                ))}
            </div>
            <PaginationSkeleton />
        </div>
    );
}

async function ArticlesResults({ queryState }: { queryState: ArticleQueryState }) {
    const articleResponse = await getArticles({
        q: queryState.q,
        category: queryState.category || undefined,
        duration: queryState.duration || undefined,
        tags: queryState.tags || undefined,
        sort: queryState.sort,
        page: queryState.page,
        pageSize: RESULTS_PAGE_SIZE
    });

    return (
        <div className="flex-1 flex flex-col gap-8">
            <p className="text-sm text-muted-foreground">
                Showing {articleResponse.items.length} of {articleResponse.total}{" "}
                {articleResponse.total === 1 ? "article" : "articles"}
            </p>
            {articleResponse.items.length ? (
                <div className="flex flex-col gap-8">
                    {articleResponse.items.map((article) => (
                        <div key={article.slug} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                            <ArticleContainer {...article} size="sm" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border border-border bg-card p-6 text-sm text-muted-foreground">
                    No articles found for the current filters. Try clearing some filters or changing your search query.
                </div>
            )}

            <Pagination
                currentPage={articleResponse.page}
                totalPages={articleResponse.totalPages}
                pathname="/articles"
                query={toPaginationQuery(queryState)}
            />
        </div>
    );
}

export default async function ArticlesPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
    const queryState = parseQueryState(resolvedSearchParams);
    const filterOptions = await getArticleFilterOptions();

    return (
        <PageContainer className="space-y-24">
            {/* Heading */}
            <div className="w-full flex flex-col mt-24 gap-2">
                <h1 className="font-bold text-3xl">Browse Articles</h1>
                <p className="text-muted-foreground">
                    A comprehensive index of all published works, organized chronologically. Explore the full collection
                    of insights covering technology, design, and modern development.
                </p>
            </div>

            {/* Main Section */}
            <div className="w-full flex flex-col md:flex-row gap-12">
                {/* Filters */}
                <div className="w-full md:w-80 flex flex-col gap-6">
                    <h3 className="text-lg font-medium">Filters</h3>
                    <ArticleFilters categoryOptions={filterOptions.categories} tagOptions={filterOptions.tags} />
                </div>

                <Suspense key={getResultsKey(queryState)} fallback={<ArticlesResultsSkeleton />}>
                    <ArticlesResults queryState={queryState} />
                </Suspense>
            </div>
        </PageContainer>
    );
}
