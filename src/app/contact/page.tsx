import PageContainer from "@/ui/shared/PageContainer";
import ContactForm from "@/ui/contact/ContactForm";
import { Bug, Handshake, SpellCheck } from "lucide-react";
import { ReactNode } from "react";

export default function Page() {
    return (
        <PageContainer className="space-y-36">
            {/* Page Heading */}
            <div className="flex flex-col w-full mt-24">
                <div>
                    <h1 className={`font-bold text-3xl `}>How Can I Help?</h1>
                    <p className="text-muted-foreground">Support, feedback, and general inquiries, I am all ears.</p>
                </div>
            </div>

            {/* Subject Cards */}
            <div className="flex flex-col md:flex-row gap-24">
                <Subject
                    icon={<Bug size={32} />}
                    title="Report a Bug"
                    description="Found a broken link or a layout glitch? I'd love to squash it."
                />
                <Subject
                    icon={<SpellCheck size={32} />}
                    title="Content Correction"
                    description="I ain't perfect. If you spot a factual error, help me fix it."
                />
                <Subject
                    icon={<Handshake size={32} />}
                    title="Collaborate"
                    description="Interested in working together or sponsoring a post?"
                />
            </div>

            {/* Form and Prefer Email? */}
            <ContactForm />
        </PageContainer>
    );
}

export function Subject({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
    return (
        <div className="flex flex-col gap-2 items-start">
            <span className="text-accent">{icon}</span>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    );
}
