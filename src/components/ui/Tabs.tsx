"use client";

import { Children, isValidElement, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { getTabLabel, type TabProps } from "./Tab";

type TabsProps = {
    defaultIndex?: number;
    children: ReactNode;
};

function getCodeFromPanel(panel: HTMLElement | null): string {
    if (!panel) return "";

    const pre = panel.querySelector("pre");
    if (!pre) return "";

    const lineNodes = pre.querySelectorAll<HTMLElement>("[data-line]");

    if (lineNodes.length > 0) {
        return Array.from(lineNodes)
            .map((line) => line.textContent ?? "")
            .join("\n");
    }

    return pre.textContent ?? "";
}

export default function Tabs({ defaultIndex = 0, children }: TabsProps) {
    const tabs = Children.toArray(children).filter((child): child is ReactElement<TabProps> => {
        return isValidElement<TabProps>(child) && Boolean(getTabLabel(child.props));
    });

    const safeDefault = Math.min(Math.max(0, defaultIndex), Math.max(0, tabs.length - 1));
    const [activeIndex, setActiveIndex] = useState(safeDefault);
    const [copied, setCopied] = useState(false);
    const tabsId = useId();
    const panelRef = useRef<HTMLDivElement | null>(null);
    const resetTimerRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current !== null) {
                window.clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    const handleKeyboardNav = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!tabs.length) return;

        if (event.key === "ArrowRight") {
            event.preventDefault();
            setActiveIndex((current) => (current + 1) % tabs.length);
            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            setActiveIndex((current) => (current - 1 + tabs.length) % tabs.length);
            return;
        }

        if (event.key === "Home") {
            event.preventDefault();
            setActiveIndex(0);
            return;
        }

        if (event.key === "End") {
            event.preventDefault();
            setActiveIndex(tabs.length - 1);
        }
    };

    const handleCopy = async () => {
        const codeText = getCodeFromPanel(panelRef.current).trimEnd();
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

    if (!tabs.length) return null;

    return (
        <div className="not-prose my-6 overflow-hidden border border-border bg-card">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 p-2">
                <div
                    role="tablist"
                    aria-label="Tabs"
                    onKeyDown={handleKeyboardNav}
                    className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pr-2 [&::-webkit-scrollbar]:hidden">
                    {tabs.map((tab, index) => {
                        const isActive = index === activeIndex;
                        const label = getTabLabel(tab.props);

                        return (
                            <button
                                key={`${tabsId}-tab-${index}`}
                                id={`${tabsId}-tab-${index}`}
                                type="button"
                                role="tab"
                                tabIndex={isActive ? 0 : -1}
                                aria-selected={isActive}
                                aria-controls={`${tabsId}-panel-${index}`}
                                className={`whitespace-nowrap border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                    isActive
                                        ? "border-border bg-background text-foreground"
                                        : "border-transparent text-muted-foreground hover:border-border hover:bg-background hover:text-foreground"
                                }`}
                                onClick={() => setActiveIndex(index)}>
                                {label}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? "Copied code" : "Copy code"}
                    className="inline-flex items-center gap-1.5 border border-border bg-background px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>

            <div
                ref={panelRef}
                data-mdx-tabs-panel
                id={`${tabsId}-panel-${activeIndex}`}
                role="tabpanel"
                aria-labelledby={`${tabsId}-tab-${activeIndex}`}
                className="p-0">
                {tabs[activeIndex]}
            </div>
        </div>
    );
}
