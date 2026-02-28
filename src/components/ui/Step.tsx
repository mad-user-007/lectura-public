import type { ReactNode } from "react";

export type StepProps = {
    title: string;
    children: ReactNode;
};

export default function Step({ children }: StepProps) {
    return <>{children}</>;
}
