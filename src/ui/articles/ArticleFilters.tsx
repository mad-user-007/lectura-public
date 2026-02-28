"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import type { ArticleBase } from "@/lib/types";
import Input from "@/ui/shared/Input";

type FilterOption = {
    label: string;
    value: string;
};

type ArticleFiltersProps = {
    className?: string;
    categoryOptions?: FilterOption[];
    tagOptions?: FilterOption[];
    sortOptions?: FilterOption[];
    articles?: ArticleBase[];
};

const INITIAL_VISIBLE_CATEGORIES = 6;

const DEFAULT_CATEGORY_OPTIONS: FilterOption[] = [
    { label: "All", value: "" },
    { label: "Technology", value: "technology" },
    { label: "Science", value: "science" },
    { label: "Programming", value: "programming" },
    { label: "Design", value: "design" },
    { label: "Business", value: "business" },
    { label: "History", value: "history" },
    { label: "AI", value: "ai" }
];

const DEFAULT_SORT_OPTIONS: FilterOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Popular", value: "popular" }
];

const DEFAULT_TAG_OPTIONS: FilterOption[] = [
    { label: "React", value: "react" },
    { label: "Next.js", value: "nextjs" },
    { label: "TypeScript", value: "typescript" },
    { label: "Tailwind", value: "tailwind" },
    { label: "Design", value: "design" },
    { label: "Performance", value: "performance" },
    { label: "Node.js", value: "nodejs" },
    { label: "Accessibility", value: "accessibility" },
    { label: "Testing", value: "testing" },
    { label: "Architecture", value: "architecture" },
    { label: "Security", value: "security" },
    { label: "UX", value: "ux" }
];

const DURATION_OPTIONS: FilterOption[] = [
    { label: "Quick (<5m)", value: "quick" },
    { label: "Medium (5-10m)", value: "medium" },
    { label: "Deep (>10m)", value: "deep" }
];

const PILL_BASE_CLASS =
    "rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1";

function getDelimitedValues(searchParams: ReadonlyURLSearchParams, key: string) {
    const raw = searchParams.get(key) ?? "";
    if (!raw) return [] as string[];

    return raw
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

export default function ArticleFilters({
    className,
    categoryOptions,
    tagOptions,
    sortOptions,
    articles
}: ArticleFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const computedCategoryOptions = useMemo(() => {
        if (categoryOptions?.length) {
            return categoryOptions;
        }

        if (articles?.length) {
            const categoryMap = new Map<string, string>();
            articles.forEach((article) => {
                if (!categoryMap.has(article.category.slug)) {
                    categoryMap.set(article.category.slug, article.category.name);
                }
            });

            return [
                { label: "All", value: "" },
                ...Array.from(categoryMap.entries()).map(([value, label]) => ({ value, label }))
            ];
        }

        return DEFAULT_CATEGORY_OPTIONS;
    }, [articles, categoryOptions]);

    const computedSortOptions = sortOptions?.length ? sortOptions : DEFAULT_SORT_OPTIONS;
    const computedTagOptions = tagOptions?.length ? tagOptions : DEFAULT_TAG_OPTIONS;

    const currentQ = searchParams.get("q") ?? "";
    const selectedCategory = searchParams.get("category") ?? "";
    const selectedSort = searchParams.get("sort") ?? "newest";
    const selectedDurations = getDelimitedValues(searchParams, "duration");
    const selectedTags = getDelimitedValues(searchParams, "tags");

    const [searchValue, setSearchValue] = useState(currentQ);
    const [tagSearchValue, setTagSearchValue] = useState("");
    const [showAllCategories, setShowAllCategories] = useState(false);

    useEffect(() => {
        setSearchValue(currentQ);
    }, [currentQ]);

    const updateQuery = useCallback(
        (key: string, value?: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }

            params.delete("page");

            const query = params.toString();
            router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
        },
        [pathname, router, searchParams]
    );

    useEffect(() => {
        const handle = setTimeout(() => {
            const next = searchValue.trim();
            if (next === currentQ) return;
            updateQuery("q", next || undefined);
        }, 300);

        return () => clearTimeout(handle);
    }, [currentQ, searchValue, updateQuery]);

    const onDurationChange = (value: string, checked: boolean) => {
        const nextValues = checked
            ? Array.from(new Set([...selectedDurations, value]))
            : selectedDurations.filter((duration) => duration !== value);

        updateQuery("duration", nextValues.length ? nextValues.join(",") : undefined);
    };

    const onCategoryPillClick = (value: string) => {
        updateQuery("category", value || undefined);
    };

    const onTagPillClick = (value: string) => {
        const isActive = selectedTags.includes(value);
        const nextValues = isActive ? selectedTags.filter((tag) => tag !== value) : [...selectedTags, value];
        updateQuery("tags", nextValues.length ? nextValues.join(",") : undefined);
    };

    const filteredTagOptions = useMemo(() => {
        const query = tagSearchValue.trim().toLowerCase();
        if (!query) return computedTagOptions;

        return computedTagOptions.filter(
            (option) => option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query)
        );
    }, [computedTagOptions, tagSearchValue]);

    const visibleCategoryOptions = useMemo(() => {
        if (showAllCategories || computedCategoryOptions.length <= INITIAL_VISIBLE_CATEGORIES) {
            return computedCategoryOptions;
        }

        const initial = computedCategoryOptions.slice(0, INITIAL_VISIBLE_CATEGORIES);

        if (selectedCategory && !initial.some((option) => option.value === selectedCategory)) {
            const selected = computedCategoryOptions.find((option) => option.value === selectedCategory);
            if (selected) {
                return [...initial, selected];
            }
        }

        return initial;
    }, [computedCategoryOptions, selectedCategory, showAllCategories]);

    const hasMoreCategories = computedCategoryOptions.length > INITIAL_VISIBLE_CATEGORIES;

    return (
        <aside className={`w-full ${className ?? ""}`}>
            <div className="flex flex-col gap-8">
                <Input
                    label="Search"
                    id="article-search"
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search articles..."
                    leftIcon={<Search className="h-4 w-4" />}
                    containerClassName="gap-2"
                    inputClassName="text-sm"
                />

                <section className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-foreground">Category</h4>
                        {hasMoreCategories ? (
                            <button
                                type="button"
                                onClick={() => setShowAllCategories((prev) => !prev)}
                                aria-expanded={showAllCategories}
                                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">
                                {showAllCategories ? "Show less" : "Load more"}
                                {showAllCategories ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                )}
                            </button>
                        ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {visibleCategoryOptions.map((option) => {
                            const isActive = selectedCategory === option.value;
                            return (
                                <button
                                    key={`category-pill-${option.value || "all"}`}
                                    type="button"
                                    onClick={() => onCategoryPillClick(option.value)}
                                    aria-pressed={isActive}
                                    className={`${PILL_BASE_CLASS} ${
                                        isActive
                                            ? "border-primary bg-primary text-white"
                                            : "border-border bg-background text-muted-foreground hover:border-ring/60 hover:text-foreground"
                                    }`}>
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold text-foreground">Tags</h4>
                    <Input
                        id="tag-search"
                        type="text"
                        value={tagSearchValue}
                        onChange={(event) => setTagSearchValue(event.target.value)}
                        placeholder="Search tags and add to filter..."
                        leftIcon={<Search className="h-4 w-4" />}
                        containerClassName="gap-2"
                        inputClassName="text-sm"
                    />
                    <div className="flex flex-wrap gap-2">
                        {filteredTagOptions.map((option) => {
                            const isActive = selectedTags.includes(option.value);
                            return (
                                <button
                                    key={`tag-pill-${option.value}`}
                                    type="button"
                                    onClick={() => onTagPillClick(option.value)}
                                    aria-pressed={isActive}
                                    className={`${PILL_BASE_CLASS} text-xs ${
                                        isActive
                                            ? "border-primary bg-primary text-white"
                                            : "border-border bg-background text-muted-foreground hover:border-ring/60 hover:text-foreground"
                                    }`}>
                                    {option.label}
                                </button>
                            );
                        })}
                        {filteredTagOptions.length === 0 ? (
                            <p className="text-xs text-muted-foreground">No matching tags found.</p>
                        ) : null}
                    </div>
                </section>

                <fieldset className="flex flex-col gap-3">
                    <legend className="mb-3 text-sm font-semibold text-foreground">Duration</legend>
                    {DURATION_OPTIONS.map((option) => {
                        const id = `duration-${option.value}`;
                        return (
                            <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center gap-2 text-sm text-muted-foreground">
                                <input
                                    id={id}
                                    type="checkbox"
                                    checked={selectedDurations.includes(option.value)}
                                    onChange={(event) => onDurationChange(option.value, event.target.checked)}
                                    className="h-4 w-4 accent-primary"
                                />
                                <span>{option.label}</span>
                            </label>
                        );
                    })}
                </fieldset>

                <fieldset className="flex flex-col gap-3">
                    <legend className="mb-1 text-sm font-semibold text-foreground mb-3">Sort</legend>
                    {computedSortOptions.map((option) => {
                        const id = `sort-${option.value}`;
                        return (
                            <label
                                key={option.value}
                                htmlFor={id}
                                className="flex items-center gap-2 text-sm text-muted-foreground">
                                <input
                                    id={id}
                                    name="sort"
                                    type="radio"
                                    checked={selectedSort === option.value}
                                    onChange={() => updateQuery("sort", option.value)}
                                    className="h-4 w-4 accent-primary"
                                />
                                <span>{option.label}</span>
                            </label>
                        );
                    })}
                </fieldset>
            </div>
        </aside>
    );
}
