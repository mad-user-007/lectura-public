"use client";

import { forwardRef, useId } from "react";
import clsx from "clsx";

type InputSize = "sm" | "md" | "lg";

type BaseProps = {
    label?: string | React.ReactNode;
    helperText?: string;
    error?: string;
    containerClassName?: string;
    inputClassName?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    size?: InputSize;
};

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
    BaseProps & {
        as?: "input";
    };

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    BaseProps & {
        as: "textarea";
    };

type Props = InputProps | TextAreaProps;

const sizeStyles: Record<InputSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(function Input(
    {
        label,
        helperText,
        error,
        containerClassName,
        inputClassName,
        leftIcon,
        rightIcon,
        size = "md",
        id,
        disabled,
        as = "input",
        ...props
    },
    ref
) {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
        <div className={clsx("flex flex-col gap-2", containerClassName)}>
            {label ? (
                <label htmlFor={inputId} className="text-sm font-medium text-foreground">
                    {label}
                </label>
            ) : null}

            <div
                className={clsx(
                    "flex items-center gap-2 border border-border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring",
                    sizeStyles[size],
                    disabled && "opacity-60",
                    error && "border-red-500/60 focus-within:ring-red-500/40"
                )}>
                {leftIcon ? <span className="text-muted-foreground">{leftIcon}</span> : null}

                {as === "textarea" ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        id={inputId}
                        disabled={disabled}
                        className={clsx(
                            "min-h-[120px] w-full resize-y bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground",
                            inputClassName
                        )}
                        {...(props as TextAreaProps)}
                    />
                ) : (
                    <input
                        ref={ref as React.Ref<HTMLInputElement>}
                        id={inputId}
                        disabled={disabled}
                        className={clsx(
                            "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground",
                            inputClassName
                        )}
                        {...(props as InputProps)}
                    />
                )}

                {rightIcon ? <span className="text-muted-foreground">{rightIcon}</span> : null}
            </div>

            {error || helperText ? (
                <p className={clsx("text-xs", error ? "text-red-500" : "text-muted-foreground")}>
                    {error ?? helperText}
                </p>
            ) : null}
        </div>
    );
});

export default Input;
