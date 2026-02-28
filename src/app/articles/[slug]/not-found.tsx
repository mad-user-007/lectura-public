import Link from "next/link";

export default function ArticleNotFound() {
    return (
        <div className="mx-auto flex min-h-[50vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-3xl font-bold text-foreground">Article not found</h1>
            <p className="text-muted-foreground">
                The article you are looking for does not exist or may have been removed.
            </p>
            <Link
                href="/articles"
                className="inline-flex items-center border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-ring/60"
            >
                Back to Articles
            </Link>
        </div>
    );
}
