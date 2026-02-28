import PageContainer from "@/ui/shared/PageContainer";
import Skeleton from "@/ui/shared/skeletons/Skeleton";
import PopularTagsSkeleton from "@/ui/tags/PopularTagsSkeleton";
import ArticleBaseSkeleton from "@/ui/articles/ArticleBaseSkeleton";

function ArticleSectionSkeleton({ title }: { title: string }) {
    return (
        <div className="w-full flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="flex flex-col md:flex-row gap-12">
                <ArticleBaseSkeleton />
                <ArticleBaseSkeleton />
            </div>
        </div>
    );
}

export default function CategoryDetailsLoading() {
    return (
        <PageContainer className="space-y-24">
            {/* Breadcrumb & Category Summary */}
            <div className="w-full mt-24 flex flex-col items-start gap-6">
                <Skeleton className="h-8 w-32 " />

                {/* Cover Image */}
                <Skeleton className="w-full h-40 " />

                {/* Heading and Metadata */}
                <div className="w-full flex flex-col gap-4 items-start">
                    <Skeleton className="h-12 w-72 " />
                    <Skeleton className="h-6 w-36 " />
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-4 w-full " />
                        <Skeleton className="h-4 w-11/12 " />
                        <Skeleton className="h-4 w-3/4 " />
                    </div>
                </div>
            </div>

            {/* Featured */}
            <ArticleSectionSkeleton title="Featured" />

            {/* Trending */}
            <ArticleSectionSkeleton title="Trending" />

            {/* Popular Tags */}
            <PopularTagsSkeleton />

            {/* View All articles */}
            <div className="w-full">
                <Skeleton className="h-8 w-50" />
            </div>
        </PageContainer>
    );
}
