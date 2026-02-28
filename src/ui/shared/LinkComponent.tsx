import Link from "next/link";

export default function LinkComponent({ label, href }: { label: string; href: string }) {
    return (
        <Link href={href} className="text-muted-fg d-block hover:text-primary hover:bg-primary/10 px-4 py-2">
            {label}
        </Link>
    );
}
