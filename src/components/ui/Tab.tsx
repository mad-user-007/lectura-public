"use client";

import type { ReactNode } from "react";

export type TabProps = {
    title?: string;
    label?: string;
    language?: string;
    value?: string;
    children: ReactNode;
};

export function getTabLabel({ title, label, language, value }: TabProps) {
    return title ?? label ?? language ?? value ?? "";
}

export default function Tab({ children }: TabProps) {
    return <>{children}</>;
}
