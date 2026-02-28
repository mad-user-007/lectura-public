import type { ArticleBase, ArticleSummary, CategoryDetailed, CategorySummary } from "@/lib/types";

// PARAMETER TYPES

type GetCategoriesParams = {
    query?: string;
    page?: number;
    pageSize?: number;
};

type GetArticlesParams = {
    q?: string;
    category?: string;
    duration?: string;
    tags?: string;
    sort?: "newest" | "oldest" | "popular";
    page?: number;
    pageSize?: number;
};

// RESPONSE TYPES

type GetCategoriesResponse = {
    items: CategorySummary[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

type GetArticlesResponse = {
    items: ArticleSummary[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

type FilterOption = {
    label: string;
    value: string;
};

type GetArticleFilterOptionsResponse = {
    categories: FilterOption[];
    tags: FilterOption[];
};

const categories: CategorySummary[] = [
    {
        name: "Technology",
        slug: "technology",
        image: "/COVER_IMAGE.jpg",
        number_of_articles: "35",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi labore possimus ullam voluptatem error nihil sit? Quis, dicta pariatur! Laudantium optio natus corrupti dolor quo id corporis rerum aut?"
    },
    {
        name: "Science",
        slug: "science",
        number_of_articles: "35",
        image: "/COVER_IMAGE.jpg",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi labore possimus ullam voluptatem error nihil sit? Quis, dicta pariatur! Laudantium optio natus corrupti dolor quo id corporis rerum aut?"
    },
    {
        name: "Programming",
        slug: "programming",
        image: "/COVER_IMAGE.jpg",
        number_of_articles: "35",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi labore possimus ullam voluptatem error nihil sit? Quis, dicta pariatur! Laudantium optio natus corrupti dolor quo id corporis rerum aut?"
    },
    {
        name: "Computer Science",
        slug: "computer-science",
        image: "/COVER_IMAGE.jpg",
        number_of_articles: "35",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi labore possimus ullam voluptatem error nihil sit? Quis, dicta pariatur! Laudantium optio natus corrupti dolor quo id corporis rerum aut?"
    },
    {
        name: "History",
        slug: "history",
        image: "/COVER_IMAGE.jpg",
        number_of_articles: "35",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi labore possimus ullam voluptatem error nihil sit? Quis, dicta pariatur! Laudantium optio natus corrupti dolor quo id corporis rerum aut?"
    },
    {
        name: "Design",
        slug: "design",
        image: "/COVER_IMAGE.jpg",
        number_of_articles: "35",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quasi labore possimus ullam voluptatem error nihil sit? Quis, dicta pariatur! Laudantium optio natus corrupti dolor quo id corporis rerum aut?"
    }
];

type ArticleSeed = {
    slug: string;
    categorySlug: string;
    title: string;
    description: string;
    tags: string[];
    publishedOn: string;
    views: string;
    duration: string;
};

const articleSeeds: ArticleSeed[] = [
    {
        slug: "react-19-migration-path",
        categorySlug: "programming",
        title: "React 19 migration path for mature codebases",
        description: "A staged migration strategy that avoids regressions and keeps feature delivery moving.",
        tags: ["react", "typescript", "architecture"],
        publishedOn: "Jan 18, 2026",
        views: "18.2K",
        duration: "7 min"
    },
    {
        slug: "design-systems-without-chaos",
        categorySlug: "design",
        title: "Design systems without governance chaos",
        description: "Define ownership and contribution rules so your system stays fast, consistent, and useful.",
        tags: ["design", "ux", "performance"],
        publishedOn: "Jan 15, 2026",
        views: "9.4K",
        duration: "6 min"
    },
    {
        slug: "nextjs-routing-at-scale",
        categorySlug: "technology",
        title: "Next.js routing strategies at scale",
        description: "Practical tradeoffs between static, dynamic, and streaming routes in large products.",
        tags: ["nextjs", "architecture", "performance"],
        publishedOn: "Jan 12, 2026",
        views: "22.6K",
        duration: "11 min"
    },
    {
        slug: "pragmatic-web-security-checklist",
        categorySlug: "computer-science",
        title: "Pragmatic web security checklist",
        description: "The controls that catch the majority of real-world web vulnerabilities in production.",
        tags: ["security", "testing", "nodejs"],
        publishedOn: "Jan 08, 2026",
        views: "15.1K",
        duration: "9 min"
    },
    {
        slug: "ship-faster-with-contract-tests",
        categorySlug: "programming",
        title: "Ship faster with contract tests",
        description: "A lightweight pattern for keeping frontend and backend integrations reliable.",
        tags: ["testing", "typescript", "nodejs"],
        publishedOn: "Jan 05, 2026",
        views: "11.0K",
        duration: "5 min"
    },
    {
        slug: "ai-product-discovery-patterns",
        categorySlug: "technology",
        title: "AI product discovery patterns that actually work",
        description: "How teams validate AI features early without committing to expensive architecture.",
        tags: ["ai", "product", "design"],
        publishedOn: "Dec 30, 2025",
        views: "27.3K",
        duration: "13 min"
    },
    {
        slug: "history-of-interface-metaphors",
        categorySlug: "history",
        title: "A brief history of interface metaphors",
        description: "From desktop files to modern cards, how metaphors shaped user expectations.",
        tags: ["history", "ux", "design"],
        publishedOn: "Dec 23, 2025",
        views: "6.8K",
        duration: "8 min"
    },
    {
        slug: "scientific-thinking-for-engineers",
        categorySlug: "science",
        title: "Scientific thinking for engineers",
        description: "Using hypothesis-driven iteration to improve technical decisions and outcomes.",
        tags: ["science", "architecture", "performance"],
        publishedOn: "Dec 20, 2025",
        views: "8.9K",
        duration: "10 min"
    },
    {
        slug: "tailwind-scale-with-token-discipline",
        categorySlug: "design",
        title: "Tailwind at scale with token discipline",
        description: "Avoid utility drift by standardizing tokens and component-level constraints.",
        tags: ["tailwind", "design", "typescript"],
        publishedOn: "Dec 16, 2025",
        views: "13.4K",
        duration: "6 min"
    },
    {
        slug: "node-observability-for-small-teams",
        categorySlug: "technology",
        title: "Node.js observability for small teams",
        description: "A minimal logging and tracing stack that gives you high leverage quickly.",
        tags: ["nodejs", "performance", "security"],
        publishedOn: "Dec 10, 2025",
        views: "10.7K",
        duration: "12 min"
    },
    {
        slug: "accessibility-audit-fast-path",
        categorySlug: "design",
        title: "Accessibility audit fast path",
        description: "An efficient way to prioritize accessibility fixes by impact and implementation cost.",
        tags: ["accessibility", "ux", "testing"],
        publishedOn: "Dec 05, 2025",
        views: "7.5K",
        duration: "4 min"
    },
    {
        slug: "distributed-systems-for-web-developers",
        categorySlug: "computer-science",
        title: "Distributed systems for web developers",
        description: "The minimum distributed systems concepts every full-stack developer should internalize.",
        tags: ["architecture", "security", "science"],
        publishedOn: "Nov 30, 2025",
        views: "19.6K",
        duration: "14 min"
    }
];

function toTagName(slug: string) {
    return slug
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

const allArticles: ArticleSummary[] = articleSeeds.map((seed) => {
    const category = categories.find((item) => item.slug === seed.categorySlug) ?? categories[0];

    return {
        slug: seed.slug,
        title: seed.title,
        description: seed.description,
        category: {
            slug: category.slug,
            name: category.name
        },
        tags: seed.tags.map((tagSlug) => ({
            slug: tagSlug,
            name: toTagName(tagSlug)
        })),
        metadata: [
            { type: "published_on", value: seed.publishedOn },
            { type: "views", value: seed.views },
            { type: "duration", value: seed.duration }
        ]
    };
});

function toArticleBase(article: ArticleSummary): ArticleBase {
    const { slug, title, description, category, metadata } = article;
    return { slug, title, description, category, metadata };
}

const trendingArticles: ArticleBase[] = allArticles.slice(0, 3).map(toArticleBase);

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseDurationMinutes(article: ArticleBase | ArticleSummary) {
    const value = article.metadata.find((item) => item.type === "duration")?.value ?? "0";
    const match = value.match(/\d+/);
    return match ? Number(match[0]) : 0;
}

function parseViews(article: ArticleBase | ArticleSummary) {
    const value = (article.metadata.find((item) => item.type === "views")?.value ?? "0").trim().toUpperCase();
    const base = Number.parseFloat(value.replace(/[^\d.]/g, ""));

    if (Number.isNaN(base)) return 0;
    if (value.includes("M")) return base * 1_000_000;
    if (value.includes("K")) return base * 1_000;
    return base;
}

function parsePublishedTimestamp(article: ArticleBase | ArticleSummary) {
    const value = article.metadata.find((item) => item.type === "published_on")?.value ?? "";
    const timestamp = new Date(value).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
}

function matchesDuration(article: ArticleBase | ArticleSummary, selectedDurations: string[]) {
    if (!selectedDurations.length) return true;

    const duration = parseDurationMinutes(article);

    return selectedDurations.some((selected) => {
        if (selected === "quick") return duration < 5;
        if (selected === "medium") return duration >= 5 && duration <= 10;
        if (selected === "deep") return duration > 10;
        return false;
    });
}

//##########################################################
//#############          CATEGORY              #############
//##########################################################

export async function getCategories({ query = "", page = 1, pageSize = 8 }: GetCategoriesParams = {}) {
    await sleep(5000);

    const queryParam = query.trim().toLowerCase();
    const filtered = queryParam
        ? categories.filter((category) => category.name.toLowerCase().includes(queryParam))
        : categories;

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    const response: GetCategoriesResponse = {
        items,
        total,
        page: safePage,
        pageSize,
        totalPages
    };

    return response;
}

export async function getCategoryBySlug(slug: string) {
    await sleep(5000);
    return categories.find((category) => category.slug === slug) ?? null;
}

export async function getCategoryDetails(slug: string) {
    const categorySummary = categories.find((cat) => cat.slug === slug);

    if (!categorySummary) return null;

    const categoryArticles = allArticles.filter((article) => article.category.slug === slug).map(toArticleBase);

    const response: CategoryDetailed = Object.assign(
        {
            trending_articles: categoryArticles.length ? categoryArticles.slice(0, 3) : trendingArticles,
            featured_articles: categoryArticles.length ? categoryArticles.slice(0, 3) : trendingArticles
        },
        categorySummary
    );

    return response;
}

//##########################################################
//#############          ARTICLES              #############
//##########################################################

export async function getArticles({
    q = "",
    category,
    duration,
    tags,
    sort = "newest",
    page = 1,
    pageSize = 6
}: GetArticlesParams = {}) {
    await sleep(1200);

    const query = q.trim().toLowerCase();
    const selectedDurations = duration
        ? duration
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
        : [];
    const selectedTags = tags
        ? tags
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
        : [];

    let filtered = allArticles.filter((article) => {
        if (query) {
            const searchable = `${article.title} ${article.description}`.toLowerCase();
            if (!searchable.includes(query)) return false;
        }

        if (category && article.category.slug !== category) {
            return false;
        }

        if (!matchesDuration(article, selectedDurations)) {
            return false;
        }

        if (selectedTags.length) {
            const articleTagSet = new Set(article.tags.map((tag) => tag.slug));
            const hasAnyTag = selectedTags.some((tag) => articleTagSet.has(tag));
            if (!hasAnyTag) return false;
        }

        return true;
    });

    filtered = filtered.sort((first, second) => {
        if (sort === "popular") {
            return parseViews(second) - parseViews(first);
        }
        if (sort === "oldest") {
            return parsePublishedTimestamp(first) - parsePublishedTimestamp(second);
        }
        return parsePublishedTimestamp(second) - parsePublishedTimestamp(first);
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;

    const response: GetArticlesResponse = {
        items: filtered.slice(start, start + pageSize),
        total,
        page: safePage,
        pageSize,
        totalPages
    };

    return response;
}

export async function getArticleFilterOptions() {
    const categoryOptions: FilterOption[] = [
        { label: "All", value: "" },
        ...categories.map((category) => ({
            label: category.name,
            value: category.slug
        }))
    ];

    const tagMap = new Map<string, string>();
    allArticles.forEach((article) => {
        article.tags.forEach((tag) => {
            if (!tagMap.has(tag.slug)) {
                tagMap.set(tag.slug, tag.name);
            }
        });
    });

    const tagOptions: FilterOption[] = Array.from(tagMap.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((first, second) => first.label.localeCompare(second.label));

    const response: GetArticleFilterOptionsResponse = {
        categories: categoryOptions,
        tags: tagOptions
    };

    return response;
}

//##########################################################
//#############             TAGS               #############
//##########################################################

export async function getPopularTags(category?: string) {
    await sleep(700);

    const scopedArticles = category
        ? allArticles.filter((article) => article.category.slug === category)
        : allArticles;

    const counts = new Map<string, number>();

    scopedArticles.forEach((article) => {
        article.tags.forEach((tag) => {
            counts.set(tag.slug, (counts.get(tag.slug) ?? 0) + 1);
        });
    });

    const sorted = Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([slug]) => ({
            slug,
            name: toTagName(slug)
        }));

    return sorted;
}

// TYPE EXPORTS

export type {
    GetCategoriesParams,
    GetCategoriesResponse,
    GetArticlesParams,
    GetArticlesResponse,
    GetArticleFilterOptionsResponse
};
