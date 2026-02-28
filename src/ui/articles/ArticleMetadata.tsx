import { Calendar, Clock, EyeIcon } from "lucide-react";
import clsx from "clsx";

// TYPES
import { ArticleMetadataDetails } from "@/lib/types";

type MetadataSize = "sm" | "md" | "lg";

const ICONS = {
    views: EyeIcon,
    published_on: Calendar,
    duration: Clock
};

const SIZE_STYLES: Record<MetadataSize, { text: string; icon: number }> = {
    sm: { text: "text-xs", icon: 14 },
    md: { text: "text-xs", icon: 16 },
    lg: { text: "text-sm", icon: 18 }
};

export default function ArticleMetadata(props: { data: ArticleMetadataDetails[]; size?: MetadataSize }) {
    const size = props.size ?? "md";

    return (
        <div className="flex flex-row gap-6 items-center">
            {props.data.map((metadata, idx) => {
                const Icon = ICONS[metadata.type];
                return (
                    <div
                        key={`metadata-${idx}-${metadata.value}`}
                        className={clsx("flex flex-row gap-2 items-center text-muted-foreground", SIZE_STYLES[size].text)}>
                        <Icon size={SIZE_STYLES[size].icon} />
                        <p>{metadata.value}</p>
                    </div>
                );
            })}
        </div>
    );
}
