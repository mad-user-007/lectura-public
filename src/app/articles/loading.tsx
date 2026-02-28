import PageContainer from "@/ui/shared/PageContainer";
import ArticleBaseSkeleton from "@/ui/articles/ArticleBaseSkeleton";
import PaginationSkeleton from "@/ui/shared/skeletons/PaginationSkeleton";
import Skeleton from "@/ui/shared/skeletons/Skeleton";

export default function ArticlesLoading() {
    return (
        <PageContainer className="space-y-24">
            {/* Heading */}
            <div className="w-full flex flex-col mt-24 gap-3">
                <Skeleton className="h-10 w-72" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
            </div>

            {/* Main Section */}
            <div className="w-full flex flex-col md:flex-row gap-12">
                {/* Filters */}
                <div className="w-full md:w-80 flex flex-col gap-6">
                    <Skeleton className="h-7 w-20" />
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-5 w-20" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-28" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-5 w-12" />
                            <Skeleton className="h-10 w-full" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-7 w-14" />
                                <Skeleton className="h-7 w-20" />
                                <Skeleton className="h-7 w-16" />
                                <Skeleton className="h-7 w-16" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-5 w-12" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                </div>

                {/* Articles List & Pagination */}
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={`article-loading-item-${index}`} className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                                <ArticleBaseSkeleton />
                            </div>
                        ))}
                    </div>

                    <PaginationSkeleton />
                </div>
            </div>
        </PageContainer>
    );
}
