"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
    "data-language"?: string;
    "data-theme"?: string;
};

const LANGUAGE_LABELS: Record<string, string> = {
    ts: "TypeScript",
    typescript: "TypeScript",
    js: "JavaScript",
    javascript: "JavaScript",
    jsx: "JSX",
    tsx: "TSX",
    py: "Python",
    python: "Python",
    java: "Java",
    cpp: "C++",
    cxx: "C++",
    cc: "C++",
    c: "C",
    cs: "C#",
    csharp: "C#",
    go: "Go",
    rust: "Rust",
    rs: "Rust",
    php: "PHP",
    ruby: "Ruby",
    rb: "Ruby",
    swift: "Swift",
    kotlin: "Kotlin",
    kt: "Kotlin",
    bash: "Bash",
    sh: "Shell",
    sql: "SQL",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    md: "Markdown"
};

function toLanguageLabel(language?: string): string {
    if (!language) return "Plain Text";
    const normalized = language.trim().toLowerCase();
    if (!normalized) return "Plain Text";

    return LANGUAGE_LABELS[normalized] ?? normalized.replace(/[-_]/g, " ");
}

export default function CodeBlock({
    className,
    children,
    "data-language": dataLanguage,
    "data-theme": dataTheme,
    ...props
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const resetTimerRef = useRef<number | null>(null);
    const preRef = useRef<HTMLPreElement | null>(null);

    const languageLabel = useMemo(() => {
        const normalized = dataLanguage?.split(" ")[0];
        return toLanguageLabel(normalized);
    }, [dataLanguage]);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current !== null) {
                window.clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    const handleCopy = async () => {
        const pre = preRef.current;
        if (!pre) return;

        const lineNodes = pre.querySelectorAll<HTMLElement>("[data-line]");
        const codeText =
            lineNodes.length > 0
                ? Array.from(lineNodes)
                      .map((line) => line.textContent ?? "")
                      .join("\n")
                : (pre.textContent ?? "");

        if (!codeText.trim()) return;

        try {
            await navigator.clipboard.writeText(codeText);
            setCopied(true);

            if (resetTimerRef.current !== null) {
                window.clearTimeout(resetTimerRef.current);
            }

            resetTimerRef.current = window.setTimeout(() => {
                setCopied(false);
                resetTimerRef.current = null;
            }, 1800);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="mdx-code-block not-prose my-6 overflow-hidden border border-border bg-card">
            <div className="mdx-code-toolbar flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-3 py-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {languageLabel}
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? "Copied code" : "Copy code"}
                    className="inline-flex items-center gap-1.5 border border-border px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>

            <pre
                {...props}
                ref={preRef}
                data-language={dataLanguage}
                data-theme={dataTheme}
                className={clsx("mdx-code-pre m-0 overflow-x-auto p-4 text-sm", className)}>
                {children}
            </pre>
        </div>
    );
}
