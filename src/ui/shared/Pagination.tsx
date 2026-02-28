"use client";

import Link from "next/link";
import clsx from "clsx";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    hrefBuilder?: (page: number) => string;
    pathname?: string;
    query?: Record<string, string | undefined>;
    className?: string;
};

function getPages(currentPage: number, totalPages: number) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i += 1) {
        pages.add(i);
    }

    return Array.from(pages).sort((a, b) => a - b);
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    hrefBuilder,
    pathname,
    query,
    className
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
    const pages = getPages(clampedPage, totalPages);

    const canGoPrev = clampedPage > 1;
    const canGoNext = clampedPage < totalPages;

    const renderItem = (page: number, label?: string, disabled?: boolean) => {
        const isActive = page === clampedPage && !label;
        const base =
            "inline-flex items-center justify-center gap-1 border border-border px-3 py-1 text-sm transition-colors hover:border-ring/60";
        const state = isActive ? "bg-primary text-white" : "text-foreground hover:bg-muted";
        const inactive = disabled ? "opacity-50 pointer-events-none" : "";

        const buildHref = () => {
            if (!pathname) return "";

            const params = new URLSearchParams();
            Object.entries(query ?? {}).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                }
            });
            params.set("page", String(page));
            const queryString = params.toString();
            return queryString ? `${pathname}?${queryString}` : pathname;
        };

        if (hrefBuilder) {
            return (
                <Link key={label ?? page} href={hrefBuilder(page)} className={clsx(base, state, inactive)}>
                    {label ?? page}
                </Link>
            );
        }

        if (pathname) {
            return (
                <Link key={label ?? page} href={buildHref()} className={clsx(base, state, inactive)}>
                    {label ?? page}
                </Link>
            );
        }

        return (
            <button
                key={label ?? page}
                type="button"
                onClick={() => onPageChange?.(page)}
                className={clsx(base, state, inactive)}
                disabled={disabled}>
                {label ?? page}
            </button>
        );
    };

    const items: React.ReactNode[] = [];

    items.push(renderItem(clampedPage - 1, "Prev", !canGoPrev));

    pages.forEach((page, index) => {
        const prevPage = pages[index - 1];
        if (prevPage && page - prevPage > 1) {
            items.push(
                <span key={`ellipsis-${prevPage}`} className="px-2 text-muted-foreground">
                    ...
                </span>
            );
        }
        items.push(renderItem(page));
    });

    items.push(renderItem(clampedPage + 1, "Next", !canGoNext));

    return <div className={clsx("flex flex-wrap items-center gap-2", className)}>{items}</div>;
}
