"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
    label?: string | ReactNode;
    type?: ButtonVariant;
    size?: ButtonSize;
    startIcon?: ReactNode;
    href?: string;
    endIcon?: ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    htmlType?: "button" | "submit" | "reset";
    id?: string;
    title?: string;
    "aria-label"?: string;
    "aria-pressed"?: boolean;
    "aria-expanded"?: boolean;
};

export default function Button({
    label,
    type = "solid",
    size = "md",
    startIcon,
    endIcon,
    onClick,
    href,
    className,
    disabled = false,
    htmlType = "button",
    id,
    title,
    "aria-label": ariaLabel,
    "aria-pressed": ariaPressed,
    "aria-expanded": ariaExpanded
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none";

    const isIconOnly = !label && (startIcon || endIcon);

    const sizeStyles: Record<ButtonSize, { regular: string; iconOnly: string }> = {
        sm: { regular: "px-3 py-1.5 text-sm font-medium", iconOnly: "p-1.5" },
        md: { regular: "px-4 py-2 text-sm font-medium", iconOnly: "p-2" },
        lg: { regular: "px-5 py-2.5 text-base font-medium", iconOnly: "p-2.5" }
    };

    const padding = isIconOnly ? sizeStyles[size].iconOnly : sizeStyles[size].regular;

    const variants: Record<ButtonVariant, string> = {
        solid: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted"
    };

    const classes = clsx(base, padding, variants[type], disabled && "pointer-events-none opacity-50", className);

    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                aria-disabled={disabled}
                aria-label={ariaLabel}
                aria-expanded={ariaExpanded}
                aria-pressed={ariaPressed}
                title={title}
                tabIndex={disabled ? -1 : undefined}>
                {startIcon && <span className="flex items-center">{startIcon}</span>}
                {label ? <span>{label}</span> : null}
                {endIcon && <span className="flex items-center">{endIcon}</span>}
            </Link>
        );
    }

    return (
        <button
            id={id}
            type={htmlType}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-pressed={ariaPressed}
            aria-expanded={ariaExpanded}
            title={title}
            className={classes}>
            {startIcon && <span className="flex items-center">{startIcon}</span>}
            {label ? <span>{label}</span> : null}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
        </button>
    );
}
