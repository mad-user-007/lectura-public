"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Monitor, Moon, Sun } from "lucide-react";

const THEME_OPTIONS = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor }
] as const;

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open) return;
        const handleClick = (event: MouseEvent) => {
            if (!menuRef.current) return;
            if (menuRef.current.contains(event.target as Node)) return;
            setOpen(false);
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    if (!mounted) return null;

    const activeOption = THEME_OPTIONS.find((option) => option.value === theme) ?? THEME_OPTIONS[2];
    const ActiveIcon = activeOption.icon;

    return (
        <div className="relative inline-flex" ref={menuRef}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-background"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Theme menu">
                <ActiveIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{activeOption.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? (
                <div
                    role="listbox"
                    aria-label="Theme options"
                    className="absolute right-0 top-6 z-20 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-background shadow-lg">
                    {THEME_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isActive = theme === option.value;
                        const systemLabel = resolvedTheme ?? "auto";

                        return (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={isActive}
                                onClick={() => {
                                    setTheme(option.value);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors ${
                                    isActive
                                        ? "bg-muted text-foreground"
                                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                                }`}
                                title={option.value === "system" ? `System (${systemLabel})` : option.label}>
                                <Icon className="h-4 w-4" />
                                <span>{option.label}</span>
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
