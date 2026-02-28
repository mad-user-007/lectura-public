"use client";

import Skeleton from "../shared/skeletons/Skeleton";

export default function ArticleBaseSkeleton() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <Skeleton className="h-4 w-24" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-11/12" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
            </div>
            <div className="flex items-center gap-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-20" />
        </div>
    );
}
