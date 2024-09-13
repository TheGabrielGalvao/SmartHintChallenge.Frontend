import { ButtonHTMLAttributes, ReactNode } from "react";
import { tm } from "../../utils/helper/tailwindHelper";

export interface ButtonElementProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "primary" | "secondary" | "success" | "danger" | "warning";
    children: ReactNode;
    asChild?: boolean;
}

export const ButtonElement = ({
    children,
    asChild,
    className,
    variant,
    ...props
}: ButtonElementProps) => {
    return (
        <button
            className={tm(
                "p-2 rounded text-sm transition-colors focus:ring-2 ring-light shadow-md",
                {
                    "bg-none text-title border border-title hover:text-title/50":
                        variant === "default",
                    "bg-primary font-semibold text-white hover:bg-primary/80 shadow-primary/50":
                        variant === "primary",
                    "bg-secondary font-semibold text-white hover:bg-secondary/80 shadow-secondary/50":
                        variant === "secondary",
                    "bg-success text-white hover:bg-success/80 shadow-success/50":
                        variant === "success",
                    "bg-danger text-white hover:bg-danger/80 shadow-danger/50":
                        variant === "danger",
                    "bg-warning text-title hover:bg-warning/80 shadow-warning/50":
                        variant === "warning",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
