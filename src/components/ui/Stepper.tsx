import { Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { StepProps } from "./Step";

type StepperProps = {
    children: ReactNode;
};

export default function Stepper({ children }: StepperProps) {
    const steps = Children.toArray(children).filter((child): child is ReactElement<StepProps> => {
        return isValidElement<StepProps>(child) && typeof child.props.title === "string";
    });

    if (!steps.length) return null;

    return (
        <div className="not-prose my-8 space-y-5">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                    <div key={`step-${index}`} className="grid grid-cols-[2.5rem_1fr] gap-4">
                        <div className="relative flex justify-center">
                            <div className="z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-primary text-sm font-semibold text-primary-foreground">
                                {index + 1}
                            </div>
                            {!isLast ? <div className="absolute top-8 h-[calc(100%-1.25rem)] w-px bg-border" /> : null}
                        </div>

                        <div className="pb-2">
                            <h4 className="mb-2 text-base font-semibold text-foreground">{step.props.title}</h4>
                            <div className="text-sm text-muted-foreground">{step.props.children}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
