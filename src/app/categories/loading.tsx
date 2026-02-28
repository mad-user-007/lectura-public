import CategoriesContainerSkeleton from "@/ui/category/CategoryContainerSkeleton";
import PopularTagsSkeleton from "@/ui/tags/PopularTagsSkeleton";
import PaginationSkeleton from "@/ui/shared/skeletons/PaginationSkeleton";
import PageContainer from "@/ui/shared/PageContainer";
import Skeleton from "@/ui/shared/skeletons/Skeleton";

export default function Loading() {
    return (
        <PageContainer className="space-y-24">
            {/* Heading */}
            <div className="mt-24 w-full flex flex-col gap-2">
                <Skeleton className="w-60 h-10" />
                <Skeleton className="w-full h-24 md:h-12" />
            </div>

            {/* Search Bar */}
            <Skeleton className="w-full h-12" />

            {/* Categories Container */}
            <CategoriesContainerSkeleton />

            {/* Pagination */}
            <PaginationSkeleton />

            {/* Popular Tags */}
            <PopularTagsSkeleton />
        </PageContainer>
    );
}
