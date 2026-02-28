"use client";

import Skeleton from "../shared/skeletons/Skeleton";

export default function CategoriesContainerSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={`category-container-skeleton-${i}`}
                    className="flex h-full flex-col overflow-hidden bg-card/50">
                    <Skeleton className="h-40 w-full" />
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="flex items-start justify-between gap-3">
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="mt-auto">
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
