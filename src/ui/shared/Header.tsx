"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { playfair } from "../fonts";
import LinkComponent from "./LinkComponent";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const categories = ["Technology", "Science", "Programming", "Computer Science", "History"];

    useEffect(() => {
        if (!mobileOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [mobileOpen]);

    return (
        <nav className="w-full border-b border-border bg-background">
            {/* Desktop */}
            <div className="mx-auto hidden w-full max-w-6xl items-center justify-between px-4 py-4 md:flex">
                <div className="flex items-center gap-3">
                    <Image
                        src="/APP_LOGO.png"
                        alt="App Logo"
                        width={48}
                        height={48}
                        priority
                        className="h-12 w-12 shrink-0 object-contain"
                    />
                    <h1 className={`${playfair.className} text-2xl font-black text-foreground`}>Textverse</h1>
                </div>
                <div className="flex items-center gap-4">
                    <LinkComponent href="/" label="Home" />
                    <div className="group relative">
                        <button
                            type="button"
                            className="flex items-center gap-1 px-4 py-2 text-muted-fg transition-colors hover:text-primary hover:bg-primary/10"
                            aria-haspopup="true">
                            Category
                            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="invisible absolute left-0 top-full z-20 mt-2 w-56 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex flex-col">
                                {categories.map((category) => (
                                    <LinkComponent
                                        key={category}
                                        href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                                        label={category}
                                    />
                                ))}
                                <Button
                                    type="ghost"
                                    label="More categories"
                                    href="/categories"
                                    className="mt-2 w-full justify-start px-4 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <LinkComponent href="/articles" label="All Articles" />
                    <LinkComponent href="/contact" label="Contact" />
                    <LinkComponent href="/about" label="About" />
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Button label="Subscribe" />
                </div>
            </div>

            {/* Mobile */}
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:hidden">
                <div className="flex items-center gap-2">
                    <Image src="/APP_LOGO.png" width={42} height={42} alt="App Logo" />
                    <h1 className={`${playfair.className} text-xl font-black text-foreground`}>Textverse</h1>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground transition-colors hover:bg-muted">
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {mobileOpen ? (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-foreground/15 backdrop-blur-sm" />
                    <div className="absolute inset-0 flex flex-col bg-background">
                        <div className="flex items-center justify-between border-b border-border px-4 py-4">
                            <div className="flex items-center gap-2">
                                <Image src="/APP_LOGO.png" width={42} height={42} alt="App Logo" />
                                <h1 className={`${playfair.className} text-xl font-black text-foreground`}>
                                    Textverse
                                </h1>
                            </div>
                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={() => setMobileOpen(false)}
                                className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground transition-colors hover:bg-muted">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                    Home
                                </Link>
                                <div className="flex flex-col">
                                    <Link
                                        href="/categories"
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                        Categories
                                    </Link>
                                    <div className="mt-1 flex flex-col gap-1 pl-4">
                                        {categories.map((category) => (
                                            <Link
                                                key={category}
                                                href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                                                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                                                onClick={() => setMobileOpen(false)}>
                                                {category}
                                            </Link>
                                        ))}
                                        <Button
                                            type="ghost"
                                            label="See all categories"
                                            endIcon={<ChevronRight className="h-4 w-4" />}
                                            className="mt-2 w-full justify-start px-3 text-sm text-muted-foreground hover:text-foreground"
                                        />
                                    </div>
                                </div>

                                <Link
                                    href="/articles"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                    All Articles
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                    Contact
                                </Link>
                                <Link
                                    href="/about"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                    About
                                </Link>
                            </div>
                        </div>

                        <div className="border-t border-border px-4 py-4">
                            <Button label="Subscribe" className="w-full" />
                        </div>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}
