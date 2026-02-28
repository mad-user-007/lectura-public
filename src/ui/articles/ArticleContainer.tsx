import type { ArticleSummary, ArticleBase } from "@/lib/types";
import { playfair } from "../fonts";
import TagContainer from "../tags/TagContainer";
import ArticleMetadata from "./ArticleMetadata";
import Button from "../shared/Button";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ArticleContainerSize = "sm" | "md" | "lg";

type ArticleContainerProps = (ArticleBase | ArticleSummary) & {
    size?: ArticleContainerSize;
};

const SIZE_STYLES: Record<
    ArticleContainerSize,
    {
        container: string;
        category: string;
        title: string;
        description: string;
        button: ArticleContainerSize;
        metadata: ArticleContainerSize;
    }
> = {
    sm: {
        container: "gap-3",
        category: "text-xs",
        title: "text-xl",
        description: "text-sm",
        button: "sm",
        metadata: "sm"
    },
    md: {
        container: "gap-4",
        category: "text-sm",
        title: "text-2xl",
        description: "text-sm",
        button: "md",
        metadata: "md"
    },
    lg: {
        container: "gap-5",
        category: "text-sm",
        title: "text-3xl",
        description: "text-base",
        button: "lg",
        metadata: "lg"
    }
};

function hasTags(article: ArticleBase | ArticleSummary): article is ArticleSummary {
    return "tags" in article && Array.isArray(article.tags);
}

export default function ArticleContainer(props: ArticleContainerProps) {
    const size = props.size ?? "lg";
    const styles = SIZE_STYLES[size];

    return (
        <div className={clsx("flex flex-col", styles.container)}>
            <div className="flex flex-col gap-2">
                <span className={clsx("font-semibold uppercase tracking-wide text-accent", styles.category)}>
                    {props.category.name}
                </span>
                <h1
                    className={clsx(
                        ["lg", "md"].includes(size) && playfair.className,
                        "font-bold text-foreground",
                        styles.title
                    )}>
                    {props.title}
                </h1>
            </div>
            <p className={clsx("text-muted-foreground", styles.description)}>{props.description}</p>
            {/* tags */}
            {hasTags(props) && (
                <div className="flex flex-wrap gap-2">
                    {props.tags.map((tag) => (
                        <TagContainer {...tag} key={`tag-${tag.slug}`} />
                    ))}
                </div>
            )}
            {/* Metadata */}
            <ArticleMetadata data={props.metadata} size={styles.metadata} />

            {/* Read Button */}
            <div>
                <Button label="Read" endIcon={<ArrowRight />} size={styles.button} />
            </div>
        </div>
    );
}
