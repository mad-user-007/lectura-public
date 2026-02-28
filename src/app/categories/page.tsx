import CategoryContainer from "@/ui/category/CategoryContainer";
import CategoryContainerSkeleton from "@/ui/category/CategoryContainerSkeleton";
import Input from "@/ui/shared/Input";
import PageContainer from "@/ui/shared/PageContainer";
import Pagination from "@/ui/shared/Pagination";
import PopularTags from "@/ui/tags/PopularTags";
import PopularTagsSkeleton from "@/ui/tags/PopularTagsSkeleton";
import { Search } from "lucide-react";
import { Suspense } from "react";

export default async function Page() {
    await new Promise((res, rej) => setInterval(res, 3000));
    return (
        <PageContainer className="space-y-24">
            {/* Page Heading */}
            <div className="w-full flex flex-col mt-24 gap-2">
                <h1 className="font-bold text-3xl">Browse Category</h1>
                <p className="text-muted-foreground">
                    Explore a diverse index of topics ranging from modern technology to daily lifestyle. Dive into
                    specific interests or wander into something new, all open and free to read.
                </p>
            </div>

            {/* Search */}
            <div className="w-full">
                <Input placeholder="Search category" leftIcon={<Search />} />
            </div>

            {/* Categories Container */}
            <Suspense fallback={<CategoryContainerSkeleton />}>
                <CategoryContainer />
            </Suspense>

            <div>
                <Pagination currentPage={3} totalPages={10} />
            </div>

            {/* Popular Tags */}
            <Suspense fallback={<PopularTagsSkeleton />}>
                <PopularTags />
            </Suspense>
        </PageContainer>
    );
}
