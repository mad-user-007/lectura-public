"use client";

import Skeleton from "../shared/skeletons/Skeleton";

export default function PopularTagsSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="w-full flex flex-col gap-4">
            <h3 className="font-medium text-xl">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: count }).map((_, i) => (
                    <Skeleton key={`p-tag-skel-${i}`} className="h-6 w-16" />
                ))}
            </div>
        </div>
    );
}
