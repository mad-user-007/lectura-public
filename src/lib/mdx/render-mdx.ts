import "server-only";

import { createHash } from "node:crypto";
import { compile } from "@mdx-js/mdx";
import type React from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

type MdxComponent = React.ComponentType<Record<string, unknown>>;
type EvaluatedMdxModule = {
    default?: unknown;
};

const mdxCache = new Map<string, MdxComponent>();

function hashMdx(source: string) {
    return createHash("sha1").update(source).digest("hex");
}

function evaluateMdx(functionBody: string): MdxComponent {
    const fn = new Function(functionBody) as (runtime: typeof import("react/jsx-runtime")) => unknown;
    const evaluated = fn(runtime);

    if (typeof evaluated === "function") {
        return evaluated as MdxComponent;
    }

    if (evaluated && typeof evaluated === "object") {
        const moduleValue = evaluated as EvaluatedMdxModule;
        if (typeof moduleValue.default === "function") {
            return moduleValue.default as MdxComponent;
        }
    }

    throw new Error("Compiled MDX did not return a renderable component.");
}

export async function renderMdxToComponent(mdxSource: string): Promise<MdxComponent> {
    const compiled = await compile(mdxSource, {
        outputFormat: "function-body",
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex, [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark" } }]]
    });

    return evaluateMdx(String(compiled));
}

export async function renderArticleMdx(input: {
    slug: string;
    updatedAt: string;
    mdx: string;
}): Promise<MdxComponent> {
    const contentHash = hashMdx(input.mdx);
    const cacheKey = `${input.slug}:${input.updatedAt}:${contentHash}`;
    const cached = mdxCache.get(cacheKey);

    if (cached) {
        return cached;
    }

    const component = await renderMdxToComponent(input.mdx);
    mdxCache.set(cacheKey, component);

    return component;
}
