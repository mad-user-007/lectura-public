import clsx from "clsx";

type SkeletonProps = {
    width?: string;
    height?: string;
    className?: string;
};

export default function Skeleton({ width = "w-full", height = "h-24", className = "" }: SkeletonProps) {
    const hasAnyWidth = /\b(?:\w+:)?w-/.test(className); // matches w-*, md:w-*, etc.
    const hasAnyHeight = /\b(?:\w+:)?h-/.test(className); // matches h-*, md:h-*, etc.

    return (
        <div
            className={clsx(
                "bg-skeleton-background animate-pulse",
                !hasAnyWidth && width,
                !hasAnyHeight && height,
                className
            )}
        />
    );
}
