"use client";

import { CategorySummary } from "@/lib/types";
import Button from "../shared/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Category(props: CategorySummary) {
    const router = useRouter();
    return (
        <article className="flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-30 w-full">
                <Image
                    src={props.image}
                    alt={`${props.name} category cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-foreground">{props.name}</h2>
                    <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {props.number_of_articles} articles
                    </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{props.description}</p>
                <div className="mt-auto">
                    <Button
                        label="View"
                        onClick={() => router.push(`/categories/${props.slug}`)}
                        endIcon={<ArrowRight className="h-4 w-4" />}
                        className="px-0 text-sm text-foreground hover:text-foreground/80"
                        type="ghost"
                    />
                </div>
            </div>
        </article>
    );
}
