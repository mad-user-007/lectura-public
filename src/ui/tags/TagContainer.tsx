import { Tag } from "@/lib/types";

export default function TagContainer(props: Tag) {
    return (
        <div className="bg-primary/10 text-primary px-2 py-1 text-sm cursor-pointer hover:bg-primary/50">
            {props.name}
        </div>
    );
}
