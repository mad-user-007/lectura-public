import ArticleContainer from "../articles/ArticleContainer";
import type { ArticleSummary } from "@/lib/types";

const demoData: ArticleSummary = {
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis aspernatur",
    slug: "sjdfks",
    category: {
        name: "Technology",
        slug: "technology"
    },
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos temporibus itaque exercitationem ex officiis aperiam eius iure explicabo in repellat neque, laudantium dolores libero alias nemo est reiciendis fugiat architecto.",
    tags: [
        { name: "React", slug: "tag-react" },
        { name: "Bootstrap", slug: "tag-bootstrap" },
        { name: "HTML", slug: "tag-html" },
        { name: "JavaScript", slug: "tag-js" }
    ],
    metadata: [
        { type: "published_on", value: "12 Feb, 2026" },
        { type: "views", value: "12.2K" },
        { type: "duration", value: "12 minutes" }
    ]
};

export default function Featured() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h3 className="text-2xl font-semibold">Featured</h3>
            <ArticleContainer {...demoData} />
        </div>
    );
}
