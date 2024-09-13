import { clsx } from "clsx";
import { ReactNode } from "react";

export interface TextElementProps {
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    asChild?: boolean;
    className?: string;
    onClick?(): void;
}

export const TextElement = ({
    size = "md",
    children,
    className,
    onClick
}: TextElementProps) => {
    return (
        <span
            onClick={onClick}
            className={clsx(
                "font-sans",
                {
                    "text-xs": size === "sm",
                    "text-sm": size === "md",
                    "text-md": size === "lg",
                },
                className
            )}
        >
            {children}
        </span>
    );
};
