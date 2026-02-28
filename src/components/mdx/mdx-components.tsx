import { Children, isValidElement } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import type { MDXComponents } from "mdx/types";
// CUSTOM COMPONENTS
import { FileTreeFile, FileTreeFolder, FileTreeRoot } from "./FileTree";
import Tabs from "@/components/ui/Tabs";
import Tab from "@/components/ui/Tab";
import Stepper from "@/components/ui/Stepper";
import Step from "@/components/ui/Step";
import Callout from "@/components/ui/Callout";
import CodeBlock from "@/components/mdx/CodeBlock";
import Mermaid from "@/components/mdx/Mermaid";
// NEXT
import Image, { ImageProps } from "next/image";
import Link from "next/link";
// Icons
import { CheckCircle2, Clock3, ExternalLink } from "lucide-react";

type CodeProps = ComponentPropsWithoutRef<"code"> & {
    "data-language"?: string;
    "data-theme"?: string;
};

type MdxImageProps = Omit<ImageProps, "alt"> & {
    alt?: string;
};

function InlineCode({ className, ...props }: CodeProps) {
    const hasStructuredChildren = Array.isArray(props.children) || typeof props.children === "object";
    const hasBlockDisplay = props.style?.display === "grid";
    const isBlockCode = Boolean(
        props["data-language"] ||
        props["data-theme"] ||
        className?.includes("language-") ||
        hasStructuredChildren ||
        hasBlockDisplay
    );

    if (isBlockCode) {
        return <code className={className} {...props} />;
    }

    const isInline = !className;

    if (isInline) {
        return <code className="bg-muted text-accent px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />;
    }

    return <code className={className} {...props} />;
}

function Table({ children, ...props }: ComponentPropsWithoutRef<"table">) {
    return (
        <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm" {...props}>
                {children}
            </table>
        </div>
    );
}

function MdxSummary({ className, ...props }: ComponentPropsWithoutRef<"summary">) {
    return <summary className={clsx("cursor-pointer font-medium text-foreground", className)} {...props} />;
}

function MdxDetails({ className, ...props }: ComponentPropsWithoutRef<"details">) {
    return <details className={clsx("my-6 bg-card px-4 py-3", className)} {...props} />;
}

function isSummaryNode(node: ReactNode): boolean {
    if (!isValidElement(node)) return false;
    return node.type === "summary" || node.type === MdxSummary;
}

function hasSummaryDescendant(children: ReactNode): boolean {
    return Children.toArray(children).some((child) => {
        if (isSummaryNode(child)) return true;
        if (!isValidElement(child)) return false;
        return hasSummaryDescendant((child.props as { children?: ReactNode }).children);
    });
}

function MdxParagraph({ children, ...props }: ComponentPropsWithoutRef<"p">) {
    // Avoid invalid markup such as <p><summary /></p> inside <details>.
    if (hasSummaryDescendant(children)) {
        return <>{children}</>;
    }

    return (
        <p className="leading-8 text-foreground/90" {...props}>
            {children}
        </p>
    );
}

function MdxLink({ href, children, className, ...props }: ComponentPropsWithoutRef<"a">) {
    if (!href)
        return (
            <a href={href} className={className} {...props}>
                {children}
            </a>
        );

    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
        return (
            <Link
                href={href}
                className={clsx(
                    "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
                    className
                )}
                {...props}>
                {children}
            </Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/80",
                className
            )}
            {...props}>
            {children}
            <ExternalLink className="h-3 w-3 opacity-50" />
        </a>
    );
}

function MdxImage({ alt = "", ...props }: MdxImageProps) {
    const { className, ...restProps } = props;

    // MDX image sources are author-provided and not guaranteed to be statically analyzable.
    return (
        <Image
            alt={alt}
            loading="lazy"
            className={clsx("my-6 w-full border border-border object-cover", className)}
            {...restProps}
        />
    );
}

function MdxInput({ type, disabled, ...props }: ComponentPropsWithoutRef<"input">) {
    void disabled;

    if (type === "checkbox") {
        return null;
    }

    return <input type={type} {...props} />;
}

function MdxFigure({ className, ...props }: ComponentPropsWithoutRef<"figure">) {
    return <figure className={clsx("my-6", className)} {...props} />;
}

function MdxFigcaption({ className, ...props }: ComponentPropsWithoutRef<"figcaption">) {
    return <figcaption className={clsx("mt-2 text-xs text-muted-foreground opacity-80", className)} {...props} />;
}

function MdxDl({ className, ...props }: ComponentPropsWithoutRef<"dl">) {
    return <dl className={clsx("my-6 border border-border bg-card px-4 py-3", className)} {...props} />;
}

function MdxDt({ className, ...props }: ComponentPropsWithoutRef<"dt">) {
    return <dt className={clsx("mt-3 first:mt-0 text-sm font-semibold text-foreground", className)} {...props} />;
}

function MdxDd({ className, ...props }: ComponentPropsWithoutRef<"dd">) {
    return (
        <dd
            className={clsx("mt-1 border-l-2 border-border/60 pl-3 text-sm text-muted-foreground", className)}
            {...props}
        />
    );
}

function stripLeadingWhitespace(value: ReactNode): ReactNode {
    if (typeof value !== "string") return value;
    return value.replace(/^\s+/, "");
}

function extractTaskListMetadata(children: ReactNode) {
    const childNodes = Children.toArray(children);
    const contentNodes: ReactNode[] = [];
    let isTaskItem = false;
    let isChecked = false;

    for (const child of childNodes) {
        if (isValidElement(child)) {
            const childProps = child.props as { type?: string; checked?: boolean };
            const isCheckboxNode =
                (child.type === "input" || child.type === MdxInput) && childProps.type === "checkbox";

            if (isCheckboxNode) {
                isTaskItem = true;
                isChecked = Boolean(childProps.checked);
                continue;
            }
        }

        contentNodes.push(child);
    }

    if (contentNodes.length > 0) {
        contentNodes[0] = stripLeadingWhitespace(contentNodes[0]);
    }

    return { isTaskItem, isChecked, contentNodes };
}

function MdxListItem({ className, children, ...props }: ComponentPropsWithoutRef<"li">) {
    const { isTaskItem, isChecked, contentNodes } = extractTaskListMetadata(children);

    if (isTaskItem || className?.includes("task-list-item")) {
        const Icon = isChecked ? CheckCircle2 : Clock3;

        return (
            <li className={clsx("my-1 list-none", className)} {...props}>
                <span className="inline-flex items-start gap-2">
                    <Icon
                        className={clsx("mt-1 h-4 w-4 shrink-0", isChecked ? "text-primary" : "text-muted-foreground")}
                    />
                    <span className={clsx("leading-7", isChecked ? "text-primary" : "text-foreground/90")}>
                        {contentNodes}
                    </span>
                </span>
            </li>
        );
    }

    return (
        <li className={clsx("my-1", className)} {...props}>
            {children}
        </li>
    );
}

// YOUTUBE EMBED
function Youtube({ id }: { id: string }) {
    return (
        <div className="my-8 overflow-hidden border border-border bg-muted">
            <div className="relative aspect-video">
                <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    allow="autoplay; encrypted-media"
                    className="absolute inset-0 h-full w-full"
                    title="YouTube Video"
                />
            </div>
        </div>
    );
}

export const mdxComponents: MDXComponents = {
    h1: (props) => <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground" {...props} />,
    h2: (props) => <h2 className="mt-10 text-3xl font-semibold tracking-tight text-foreground" {...props} />,
    h3: (props) => <h3 className="mt-8 text-2xl font-semibold text-foreground" {...props} />,
    h4: (props) => <h4 className="mt-8 text-xl font-semibold text-foreground" {...props} />,
    h5: (props) => <h5 className="mt-6 text-lg font-semibold text-foreground" {...props} />,
    h6: (props) => (
        <h6 className="mt-6 text-base font-semibold uppercase tracking-wide text-foreground/90" {...props} />
    ),
    p: MdxParagraph,
    a: (props) => (
        <MdxLink
            className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            {...props}
        />
    ),
    ul: (props) => <ul className="my-4 list-disc pl-6" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6" {...props} />,
    li: MdxListItem,
    input: MdxInput,
    blockquote: (props) => <blockquote className="my-6 border-l-4 border-border pl-4 italic" {...props} />,
    hr: (props) => <hr className="my-10 border-border" {...props} />,
    strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
    em: (props) => <em className="italic" {...props} />,
    del: (props) => <del className="opacity-80" {...props} />,
    mark: (props) => <mark className="bg-amber-300/30 px-1 text-foreground" {...props} />,
    kbd: (props) => (
        <kbd
            className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.82em] text-foreground"
            {...props}
        />
    ),
    sup: (props) => <sup className="text-[0.75em] align-super" {...props} />,
    sub: (props) => <sub className="text-[0.75em] align-sub" {...props} />,
    pre: (props) => <CodeBlock {...props} />,
    code: InlineCode,
    img: MdxImage,
    figure: MdxFigure,
    figcaption: MdxFigcaption,
    details: MdxDetails,
    summary: MdxSummary,
    Details: MdxDetails,
    Summary: MdxSummary,
    table: Table,
    caption: ({ className, ...props }) => (
        <caption
            className={clsx("caption-bottom mt-2 text-xs text-muted-foreground opacity-80", className)}
            {...props}
        />
    ),
    thead: (props) => <thead className="border-b border-border bg-muted/40" {...props} />,
    tbody: (props) => <tbody className="divide-y divide-border" {...props} />,
    tr: (props) => <tr className="align-top" {...props} />,
    th: (props) => <th className="px-3 py-2 text-left font-semibold" {...props} />,
    td: (props) => <td className="px-3 py-2" {...props} />,
    dl: MdxDl,
    dt: MdxDt,
    dd: MdxDd,
    MdxLink,
    Figure: MdxFigure,
    Figcaption: MdxFigcaption,
    Dl: MdxDl,
    Dt: MdxDt,
    Dd: MdxDd,
    Tabs,
    Tab,
    Stepper,
    Step,
    Callout,
    Mermaid,
    FileTree: FileTreeRoot,
    Folder: FileTreeFolder,
    File: FileTreeFile,
    Youtube
};
