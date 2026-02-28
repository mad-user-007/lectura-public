"use client";

import Skeleton from "./Skeleton";

export default function PaginationSkeleton() {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            <Skeleton className="w-14 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-14 h-8" />
        </div>
    );
}
