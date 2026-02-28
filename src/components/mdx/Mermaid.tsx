"use client";

import { isValidElement, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

type MermaidProps = {
    chart?: string;
    children?: ReactNode;
    className?: string;
};

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

function normalizeChartSource(input: string): string {
    return input.replace(/^\s+/, "").replace(/\s+$/, "");
}

export default function Mermaid({ chart, children, className }: MermaidProps) {
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");
    const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 10)}`);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const source = useMemo(() => normalizeChartSource(chart ?? extractText(children)), [chart, children]);

    useEffect(() => {
        let cancelled = false;

        const renderDiagram = async () => {
            if (!source) {
                setSvg("");
                setError("Mermaid source is empty.");
                return;
            }

            try {
                const mermaidModule = await import("mermaid");
                const mermaid = mermaidModule.default;
                const prefersDark = document.documentElement.classList.contains("dark");

                mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: "strict",
                    theme: prefersDark ? "dark" : "default"
                });

                const { svg: renderedSvg, bindFunctions } = await mermaid.render(idRef.current, source);
                if (cancelled) return;

                setSvg(renderedSvg);
                setError("");

                if (typeof bindFunctions === "function" && containerRef.current) {
                    bindFunctions(containerRef.current);
                }
            } catch (renderError) {
                if (cancelled) return;
                const message =
                    renderError instanceof Error ? renderError.message : "Failed to render Mermaid diagram.";
                setSvg("");
                setError(message);
            }
        };

        void renderDiagram();

        return () => {
            cancelled = true;
        };
    }, [source]);

    return (
        <div className={clsx("not-prose my-6 border border-border bg-card", className)}>
            <div className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Mermaid
            </div>
            <div className="overflow-x-auto p-3">
                {error ? (
                    <pre className="whitespace-pre-wrap text-xs text-rose-500">{error}</pre>
                ) : (
                    <div ref={containerRef} className="min-w-fit" dangerouslySetInnerHTML={{ __html: svg }} />
                )}
            </div>
        </div>
    );
}
