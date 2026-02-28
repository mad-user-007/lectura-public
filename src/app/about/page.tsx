import PageContainer from "@/ui/shared/PageContainer";
import { Subject } from "../contact/page";
import { BookOpenText, Fingerprint, Globe, Mail, Zap } from "lucide-react";

export default function Page() {
    return (
        <PageContainer className="space-y-36">
            {/* Heading */}
            <div className="w-full flex flex-col mt-24">
                <h1 className="font-bold text-3xl">About Lectura</h1>
                <p className="text-muted-foreground">A personal experiment in open web access.</p>
            </div>

            {/* The Motivation */}
            <div className="flex flex-col gap-2 w-full">
                <span className="text-primary">
                    <BookOpenText size={36} />
                </span>
                <h3 className="font-semibold text-xl">The Motivation</h3>
                <p className="text-muted-foreground">
                    I built Lectura with a simple thesis: <b>Reading should not be hard.</b>
                </p>
                <p className="text-sm text-muted-foreground">
                    Somewhere along the way, the internet became cluttered with paywalls, intrusive pop-ups, and
                    mandatory sign-ups. I wanted to build an alternative, a digital library that respects your time and
                    your privacy.
                </p>
            </div>

            {/* How it Works */}
            <div className="w-full flex flex-col md:flex-row gap-12">
                <Subject
                    icon={<Globe />}
                    title="Universal Access"
                    description="Whether you are researching a technical topic, looking for lifestyle tips, or just exploring, the content is open. I host articles across all categories, and I will never ask for a subscription fee."
                />
                <Subject
                    icon={<Fingerprint />}
                    title="Privacy by Design"
                    description="Because there are no user accounts, there is no personal data to steal or sell. I don't track who you are. Your reading habits are yours alone."
                />
                <Subject
                    icon={<Zap />}
                    title="Zero Friction"
                    description={`"No "Continue with Google." No "Create an Account." You simply arrive, search, and read. I’ve optimized the site to load instantly, so the only thing you have to focus on is the words."`}
                />
            </div>

            {/* Get in Touch */}
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-xl">Get in Touch</h3>
                <p className="text-muted-foreground">
                    While there are no user profiles, I still value connection. If you have an article request, found a
                    bug, or just want to say hello, you can reach me directly.
                </p>

                <div className="flex flex-row gap-4 items-center">
                    <Mail size={24} />
                    <h6 className="text-primary">kmukarrabeen@gmail.com</h6>
                </div>
            </div>
        </PageContainer>
    );
}
