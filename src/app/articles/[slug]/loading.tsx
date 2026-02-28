import Skeleton from "@/ui/shared/skeletons/Skeleton";

export default function ArticleLoading() {
    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-8">
                <Skeleton className="h-6 w-36" />

                <div className="flex flex-col gap-4">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-12 w-3/4" />

                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-7 w-16" />
                        <Skeleton className="h-7 w-20" />
                        <Skeleton className="h-7 w-24" />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>

                <Skeleton className="h-px w-full" />

                <div className="flex flex-col gap-10 md:grid md:grid-cols-[minmax(0,1fr)_18rem] md:gap-12">
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-11/12" />
                        <Skeleton className="h-5 w-10/12" />
                        <Skeleton className="h-8 w-72" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-11/12" />
                        <Skeleton className="h-36 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-9/12" />
                    </div>

                    <div className="border border-border bg-card p-4 space-y-3 md:self-start md:sticky md:top-24">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-9/12" />
                    </div>
                </div>
            </div>
        </div>
    );
}
