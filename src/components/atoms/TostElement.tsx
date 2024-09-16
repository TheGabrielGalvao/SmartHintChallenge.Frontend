import { ReactNode, useEffect } from "react";
import { ButtonElement } from "./ButtonElement";
import { TextElement } from "./TextElement";
import { useLayout } from "../../context/LayoutProvider";
import { tm } from "../../utils/helper/tailwindHelper";
import { PiX } from "react-icons/pi";

export interface ToastElementProps {
    icon?: ReactNode;
    title?: string;
    date?: string;
    message?: string;
    show?: boolean;
    type?: "info" | "warning" | "danger" | "success" | "default";
}

export const ToastElement = ({
    icon,
    date,
    message,
    title,
    show,
    type,
}: ToastElementProps) => {
    const { handleSetToast, toast } = useLayout();

    useEffect(() => {
        if (toast?.show) {
            const timer = setTimeout(() => {
                handleSetToast({
                    show: false,
                });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div
            className={tm({
                "flex justify-center items-center w-full max-w-full h-14 right-2 top-20 bottom-0 absolute ":
                    show,
                hidden: !show,
            })}
        >
            <div
                className={tm(
                    {
                        "bg-success/10 border-success text-success": type === "success",
                        "bg-info/10 border-info text-info": type === "info",
                        "bg-danger/10 border-danger text-danger": type === "danger",
                        "bg-warning/10 border-warning text-warning":
                            type === "warning",
                        "bg-default border-default text-default":
                            !type || type === "default",
                    },
                    "flex items-center justify-between rounded-t-lg bg-clip-padding px-4 py-2 rounded-lg border transition-all animate-bounce duration-200"
                )}
            >
                <p className="flex items-center justify-between gap-2 w-full ">
                    <span className="flex gap-2 items-center ">
                        {icon}
                        <TextElement size="sm">{message}</TextElement>
                    </span>

                    <ButtonElement
                        type="button"
                        className="shadow-none rounded-none border-none "
                        onClick={() => handleSetToast()}
                    >
                        <PiX size={16} className="font-bold" />
                    </ButtonElement>
                </p>
            </div>
        </div>
    );
};
