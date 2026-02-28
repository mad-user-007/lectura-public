import { getPopularTags } from "@/lib/api";
import TagContainer from "./TagContainer";
import Button from "../shared/Button";

type Props = {
    category?: string;
};

export default async function PopularTags({ category }: Props) {
    const tags = await getPopularTags();

    return (
        <div className="w-full flex flex-col gap-4">
            <h3 className="font-medium text-xl">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <TagContainer key={`${tag.slug}-tag-${i}`} {...tag} />
                ))}
            </div>
        </div>
    );
}
