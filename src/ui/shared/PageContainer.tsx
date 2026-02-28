"use client";

export default function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <main className={`mx-auto w-full max-w-5xl flex flex-col items-center justify-center px-6 ${className}`}>
            {children}
        </main>
    );
}
