import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "danger" | "success";

type CalloutProps = {
    type?: CalloutType;
    children: ReactNode;
};

const STYLES: Record<CalloutType, string> = {
    info: "border-sky-500 bg-sky-500/10 text-sky-100",
    warning: "border-amber-500 bg-amber-500/10 text-amber-100",
    danger: "border-rose-500 bg-rose-500/10 text-rose-100",
    success: "border-emerald-500 bg-emerald-500/10 text-emerald-100"
};

export default function Callout({ type = "info", children }: CalloutProps) {
    return (
        <aside className={`not-prose my-6 border-l-4 p-4 ${STYLES[type]}`}>
            <div className="text-sm leading-6">{children}</div>
        </aside>
    );
}
