import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Button from "../shared/Button";
import ArticleMetadata from "../articles/ArticleMetadata";

const RECENT_ARTICLES = [
    {
        id: "signal-noise",
        category: "Technology",
        title: "Finding signal in noisy product data",
        description:
            "A practical framework for identifying what matters in product analytics without drowning in dashboards.",
        published: "Jan 12, 2026",
        duration: "6 min read",
        views: "12.21K",
        image: "/COVER_IMAGE.jpg"
    },
    {
        id: "quiet-systems",
        category: "Science",
        title: "The quiet systems behind modern discovery",
        description: "Why observability, reproducibility, and tooling shape the science we trust.",
        published: "Jan 08, 2026",
        duration: "8 min read",
        views: "12.21K",
        image: "/COVER_IMAGE.jpg"
    },
    {
        id: "composable-ui",
        category: "Programming",
        title: "Composable UI patterns that scale",
        description: "Reusable patterns for building interfaces that stay coherent as features grow.",
        published: "Jan 05, 2026",
        views: "12.21K",
        duration: "7 min read",
        image: "/COVER_IMAGE.jpg"
    },
    {
        id: "history-habits",
        category: "History",
        title: "How habits shaped the early web",
        description: "A quick look at the norms and rituals that defined the first generation of online communities.",
        published: "Jan 02, 2026",
        views: "12.21K",

        duration: "5 min read",
        image: "/COVER_IMAGE.jpg"
    }
];

const POPULAR_ARTICLES = [
    "The next era of computing is already here",
    "Why documentation is a product",
    "A designer’s guide to systems thinking",
    "What we can learn from early internet forums",
    "The anatomy of a great technical essay"
];

export default function RecentArticles() {
    return (
        <div className="flex flex-col gap-10 md:flex-row md:gap-8 w-full">
            {/* Recent Articles */}
            <div className="flex w-full flex-col gap-6 md:flex-[3]">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-foreground">Recent Articles</h3>
                </div>

                <div className="flex flex-col gap-12">
                    {RECENT_ARTICLES.map((article) => (
                        <article
                            key={article.id}
                            className="flex flex-col gap-4 bg-card p-4 hover:translate-y-1 hover:shadow-lg border border-border hover:border-ring/60 transition-all duration-200 sm:flex-row sm:items-start">
                            <div className="flex flex-1 flex-col gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                                    {article.category}
                                </span>
                                <h4 className="text-lg font-semibold text-foreground">{article.title}</h4>
                                <p className="text-sm text-muted-foreground">{article.description}</p>
                                <ArticleMetadata
                                    data={[
                                        { type: "published_on", value: article.published },
                                        { type: "views", value: article.views },
                                        { type: "duration", value: article.duration }
                                    ]}
                                />
                            </div>
                        </article>
                    ))}
                </div>

                <div>
                    <Button
                        type="ghost"
                        label="View All"
                        endIcon={<ChevronRight className="h-4 w-4" />}
                        className="text-sm text-foreground hover:text-foreground/80"
                    />
                </div>
            </div>

            {/* Popular */}
            <aside className="hidden w-full flex-col gap-6 md:flex md:flex-[1]">
                <div>
                    <h3 className="text-xl font-semibold text-foreground">Popular</h3>
                    <p className="text-sm text-muted-foreground">Top reads right now</p>
                </div>
                <ol className="flex flex-col gap-4">
                    {POPULAR_ARTICLES.map((title, index) => (
                        <li
                            key={title}
                            className="flex items-start gap-3 border border-border bg-card hover:translate-y-1 transition-all duration-200 hover:shadow-lg hover:border-ring/60 px-4 py-3 text-sm text-foreground">
                            <span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span>
                            <span className="leading-snug">{title}</span>
                        </li>
                    ))}
                </ol>
            </aside>
        </div>
    );
}
