import "katex/dist/katex.min.css";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { inter } from "@/ui/fonts";
import Header from "@/ui/shared/Header";
import Footer from "@/ui/shared/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
