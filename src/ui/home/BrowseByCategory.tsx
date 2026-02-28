import { ArrowRight, ChevronRight } from "lucide-react";
import Button from "../shared/Button";

const CATEGORIES_DATA = [
    {
        name: "Technology",
        articles: 45,
        slug: "technology"
    },
    {
        name: "Science",
        articles: 42,
        slug: "science"
    },
    {
        name: "Programming",
        articles: 32,
        slug: "programming"
    },
    {
        name: "Computer Science",
        articles: 40,
        slug: "computer-science"
    },
    {
        name: "History",
        articles: 81,
        slug: "history"
    }
];

export default function BrowseByCategory() {
    return (
        <div className="flex flex-col gap-12 w-full">
            {/* Heading */}
            <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-foreground">Browse by Category</h3>
                <p className="text-sm text-muted-foreground">Explore articles grouped by topic</p>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CATEGORIES_DATA.map((category) => (
                    <div
                        key={`browse-${category.slug}`}
                        className="group flex h-full flex-col gap-6 border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ring/60 hover:shadow-lg">
                        <div>
                            <div>
                                <h4 className="text-lg font-semibold text-foreground">{category.name}</h4>
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground">
                                {category.articles} articles
                            </span>
                        </div>

                        <div className="mt-auto">
                            <Button
                                type="ghost"
                                endIcon={
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                }
                                label="Explore"
                                className="px-0 text-sm text-foreground hover:text-foreground/80"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* More Categories Button */}
            <div>
                <Button label={"Explore All Categories"} type="ghost" endIcon={<ChevronRight />} />
            </div>
        </div>
    );
}
