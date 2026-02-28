import Image from "next/image";
import Link from "next/link";
import { playfair } from "../fonts";

const FOOTER_LINKS = [
    {
        title: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: "Recent Articles", href: "/articles" },
            { label: "Popular", href: "/popular" }
        ]
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" }
        ]
    },
    {
        title: "Resources",
        links: [
            { label: "Newsletter", href: "/newsletter" },
            { label: "Guides", href: "/guides" },
            { label: "Help Center", href: "/help" },
            { label: "Terms & Privacy", href: "/terms" }
        ]
    }
];

const SOCIAL_LINKS = [
    { label: "X / Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "YouTube", href: "https://youtube.com" }
];

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-border bg-background">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-24 pb-12">
                <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Image src="/APP_LOGO.png" width={46} height={46} alt="Textverse logo" />
                            <span className={`${playfair.className} text-2xl font-black text-foreground`}>Lectura</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Thoughtful reads on technology, science, and the ideas shaping modern life.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {SOCIAL_LINKS.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-ring/60 hover:text-foreground">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title} className="flex flex-col gap-4">
                            <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="transition-colors hover:text-foreground">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border pt-6 text-xs text-muted-foreground">
                    © 2026 Textverse. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
