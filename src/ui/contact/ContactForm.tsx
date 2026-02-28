"use client";

import { useRef } from "react";
import Button from "@/ui/shared/Button";
import Input from "@/ui/shared/Input";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement | null>(null);

    return (
        <div className="flex flex-col md:flex-row gap-12 w-full items-start">
            {/* Contact Form */}
            <div className="flex w-full flex-col gap-6 md:w-2/3">
                <div>
                    <h2 className="text-2xl font-semibold">Send a message</h2>
                    <p className="text-sm text-muted-foreground">I reply within 1-2 business days.</p>
                </div>

                <form
                    ref={formRef}
                    className="flex flex-col gap-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input label="Full name" placeholder="Jane Doe" name="name" />
                        <Input label="Email address" placeholder="you@email.com" name="email" type="email" />
                    </div>
                    <Input label="Subject" placeholder="How can we help?" name="subject" />
                    <Input
                        as="textarea"
                        label="Message"
                        name="message"
                        placeholder="Share details about your request..."
                    />
                    <div className="flex items-center gap-3">
                        <Button label="Send message" />
                        <Button
                            type="ghost"
                            label="Clear"
                            onClick={() => {
                                formRef.current?.reset();
                            }}
                        />
                    </div>
                </form>
            </div>

            {/* Prefer Email? */}
            <aside className="flex w-full flex-col gap-6 border border-border bg-card p-6 md:w-1/3">
                <div>
                    <h2 className="text-xl font-semibold">Prefer email?</h2>
                    <p className="text-sm text-muted-foreground">
                        Reach out directly and we’ll route your message to the right person.
                    </p>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            General
                        </span>
                        <span className="font-medium text-primary">hello@textverse.com</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Partnerships
                        </span>
                        <span className="font-medium text-primary">partners@textverse.com</span>
                    </div>
                </div>
            </aside>
        </div>
    );
}
