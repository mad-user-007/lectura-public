import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { isValidElement } from "react";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { ArticleDTO } from "@/types/article";
import { renderArticleMdx } from "@/lib/mdx/render-mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";
import Button from "@/ui/shared/Button";
import TagContainer from "@/ui/tags/TagContainer";
import { ArticleMetadataDetails, Tag } from "@/lib/types";
import ArticleMetadata from "@/ui/articles/ArticleMetadata";

type PageProps = {
    params: Promise<{ slug: string }>;
};

type TocItem = {
    id: string;
    title: string;
    level: 2 | 3;
};

type ArticlePageData = ArticleDTO & {
    category: {
        name: string;
        slug: string;
    };
    tags?: Tag[];
    metadata: ArticleMetadataDetails[];
};

const DUMMY_ARTICLES: ArticlePageData[] = [
    {
        slug: "production-mdx-guide",
        title: "Production MDX in Next.js: Practical Patterns",
        updatedAt: "2026-02-07T12:00:00.000Z",
        category: {
            name: "Programming",
            slug: "programming"
        },
        tags: [
            { name: "MDX", slug: "mdx" },
            { name: "Next.js", slug: "nextjs" }
        ],
        metadata: [
            { type: "published_on", value: "Feb 07, 2026" },
            { type: "duration", value: "8 min" },
            { type: "views", value: "12.4K" }
        ],
        mdx: `
This article is rendered from **dummy MDX data** stored in memory.

## Why this setup works

- Server-side MDX compilation
- Reusable UI components
- Predictable rendering

### Compile safely

Use trusted MDX only and execute compilation on the server.

\`\`\`ts
export function isPublished(updatedAt: string) {
  return new Date(updatedAt).getTime() <= Date.now();
}
\`\`\`

### Render with mapped components

You can map markdown elements and JSX blocks into your design system.

<Callout type="info">
This content is currently coming from local dummy data in the page route.
</Callout>

<Tabs defaultIndex={0}>
  <Tab language="Java">
\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java");
    }
}
\`\`\`
  </Tab>
  <Tab language="C++">
\`\`\`cpp
#include <iostream>
int main() {
    std::cout << "Hello from C++" << std::endl;
    return 0;
}
\`\`\`
  </Tab>
  <Tab language="Python">
\`\`\`python
def main():
    print("Hello from Python")

main()
\`\`\`
  </Tab>
</Tabs>

## Extended MDX primitives

#### Rich inline typography

Use <kbd>Ctrl</kbd> + <kbd>K</kbd> to open quick search. You can also use <mark>highlighted text</mark>,
chemistry formula H<sub>2</sub>O, and Einstein's E = mc<sup>2</sup>.

##### Accessibility note

Keyboard hints render using semantic <kbd>kbd</kbd> elements.

##### Math / LaTeX support

Inline equation: $E = mc^2$.

$$
\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}
$$

##### Mermaid diagram support

<Mermaid>
graph TD
  User[Reader] --> Article[MDX Article]
  Article --> Parser[MDX Compiler]
  Parser --> Components[Mapped Components]
  Components --> MermaidRender[Mermaid SVG Render]
</Mermaid>

###### Small heading depth

Lower heading levels are now styled consistently as well.

#### Task list and table

- [x] Server-side compilation enabled
- [x] Syntax highlighting enabled
- [ ] Authoring docs pending

| Feature | Status | Notes |
| --- | --- | --- |
| Tabs | Ready | Multi-language snippets |
| Stepper | Ready | Procedural guides |
| Callout | Ready | 4 contextual variants |

#### Collapsible details

<Details>
  <Summary>Open implementation checklist</Summary>
  Ensure trusted MDX only, secure rendering boundaries, and stable cache keys.
</Details>

#### Definitions

<Dl>
  <Dt>MDX</Dt>
  <Dd>Markdown with JSX for interactive technical content.</Dd>
  <Dt>RSC</Dt>
  <Dd>React Server Components for server-first rendering patterns.</Dd>
</Dl>

#### Image and caption

<Figure>
  <img src="https://picsum.photos/1200/540" alt="Editor and preview layout" />
  <Figcaption>Sample image rendered through MDX component mapping.</Figcaption>
</Figure>

<Callout type="warning">
Always sanitize external content when MDX is authored by untrusted users.
</Callout>

<Callout type="danger">
Never execute untrusted MDX on the server without strict isolation and validation.
</Callout>

<Callout type="success">
You now have a broad MDX component baseline ready for production hardening.
</Callout>

[Go to another article](/articles/mdx-components-playbook)

<MdxLink href="https://www.imagefly.space">Go to imagefly</MdxLink>

<FileTree>
    <Folder name="app" defaultOpen>
        <Folder name="java">
            <Folder name="demo">
                <File name="Demo.java" />
            </Folder>
            <File name="main.java" />
            <File name="config.yaml" />
        </Folder>
        <File name="page.tsx" />
    </Folder>
</FileTree>

<Youtube id="N7SgRFda9FU" />
`
    },
    {
        slug: "mdx-components-playbook",
        title: "MDX Components Playbook",
        updatedAt: "2026-02-06T09:30:00.000Z",
        category: {
            name: "Technology",
            slug: "technology"
        },
        tags: [{ name: "React", slug: "react" }],
        metadata: [
            { type: "published_on", value: "Feb 06, 2026" },
            { type: "duration", value: "6 min" },
            { type: "views", value: "8.1K" }
        ],
        mdx: `
Use custom JSX components to keep technical content interactive and structured.

## Component structure

Each block should do one job and stay composable.

## Delivery workflow

<Stepper>
  <Step title="Draft">
    Write markdown first, then enrich with components.
  </Step>
  <Step title="Review">
    Verify structure, links, and code blocks.
  </Step>
  <Step title="Publish">
    Save and let the server compile/render.
  </Step>
</Stepper>
`
    }
];

function stripMdxHeadingText(value: string) {
    return value
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/~~([^~]+)~~/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .trim();
}

function slugifyHeading(value: string) {
    return value
        .toLowerCase()
        .replace(/["']/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function nextSlug(value: string, slugCounts: Map<string, number>) {
    const base = slugifyHeading(value) || "section";
    const current = slugCounts.get(base) ?? 0;
    slugCounts.set(base, current + 1);
    return current === 0 ? base : `${base}-${current}`;
}

function extractTocItems(mdx: string): TocItem[] {
    const lines = mdx.split("\n");
    const items: TocItem[] = [];
    const slugCounts = new Map<string, number>();
    let inFence = false;

    for (const rawLine of lines) {
        const line = rawLine.trim();

        if (line.startsWith("```")) {
            inFence = !inFence;
            continue;
        }

        if (inFence) continue;

        const match = line.match(/^(#{2,3})\s+(.+)$/);
        if (!match) continue;

        const level = match[1].length as 2 | 3;
        const title = stripMdxHeadingText(match[2]);
        if (!title) continue;

        items.push({
            id: nextSlug(title, slugCounts),
            title,
            level
        });
    }

    return items;
}

function extractText(node: ReactNode): string {
    if (node === null || node === undefined || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map((item) => extractText(item)).join("");

    if (isValidElement(node)) {
        const element = node as { props?: { children?: ReactNode } };
        return extractText(element.props?.children);
    }

    return "";
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = DUMMY_ARTICLES.find((item) => item.slug === slug);

    if (!article) {
        notFound();
    }

    const tocItems = extractTocItems(article.mdx);
    const headingSlugCounts = new Map<string, number>();

    const mdxPageComponents = {
        ...mdxComponents,
        h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
            const text = extractText(children);
            const id = typeof props.id === "string" && props.id ? props.id : nextSlug(text, headingSlugCounts);

            return (
                <h2 id={id} className="mt-10 text-3xl font-semibold tracking-tight text-foreground" {...props}>
                    {children}
                </h2>
            );
        },
        h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => {
            const text = extractText(children);
            const id = typeof props.id === "string" && props.id ? props.id : nextSlug(text, headingSlugCounts);

            return (
                <h3 id={id} className="mt-8 text-2xl font-semibold text-foreground" {...props}>
                    {children}
                </h3>
            );
        }
    };

    const MDXContent = await renderArticleMdx({
        slug: article.slug,
        updatedAt: article.updatedAt,
        mdx: article.mdx
    });

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-8">
                <div>
                    <Button
                        label={article.category.name}
                        startIcon={<ChevronLeft />}
                        type="ghost"
                        href={`/categories/${article.category.slug}`}
                    />
                </div>
                <header className="flex flex-col gap-4">
                    <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                        {article.category.name}
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{article.title}</h1>

                    {article.tags?.length ? (
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <TagContainer key={`${article.slug}-${tag.slug}`} {...tag} />
                            ))}
                        </div>
                    ) : null}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <ArticleMetadata data={article.metadata} />
                    </div>
                </header>

                <hr className="border-border" />

                <div className="flex flex-col gap-10 md:grid md:grid-cols-[minmax(0,1fr)_18rem] md:gap-12">
                    <article
                        className="order-2 md:order-1
    prose prose-lg dark:prose-invert max-w-none

    /* let Shiki variables control code block colors */
    prose-pre:bg-transparent prose-pre:text-inherit
    prose-pre:p-0 prose-pre:border-0
  ">
                        <MDXContent components={mdxPageComponents} />
                    </article>

                    <aside className="order-1 md:order-2 md:self-start">
                        <div className="border border-border bg-card p-4">
                            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                                On this page
                            </h2>
                            {tocItems.length ? (
                                <nav aria-label="Table of contents">
                                    <ul className="space-y-2">
                                        {tocItems.map((item) => (
                                            <li
                                                key={`${article.slug}-toc-${item.id}`}
                                                className={item.level === 3 ? "pl-4" : ""}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                                    {item.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            ) : (
                                <p className="text-sm text-muted-foreground">No sections available.</p>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
