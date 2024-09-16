import { InputHTMLAttributes } from "react";
import { TextElement } from "./TextElement";
import { tm } from "../../utils/helper/tailwindHelper";

export interface CheckboxElementProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    checked?: boolean;
    onCheck?(): void;
    onClick?(): void;
}

export const CheckboxElement = ({
    className,
    id,
    name,
    label,
    checked,
    onClick,
    onCheck = () => { },
    disabled,
    ...props
}: CheckboxElementProps) => {
    return (
        <div>
            <div className={tm({ className }, "flex gap-xs justify-center items-center")}>
                <input
                    className={tm(
                        {
                            "bg-transparent": !disabled,
                            "bg-gray-300": disabled,
                        },
                        "appearance-none w-5 h-5 border rounded-md",
                        "border-primary",
                        "checked:bg-primary checked:border-primary",
                        "focus:outline-none focus:ring-2 focus:ring-primary",
                        "transition duration-300 ease-in-out",
                        "cursor-pointer",
                        "relative"
                    )}
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onClick={onClick}
                    {...props}
                />
                <label
                    className="hover:cursor-pointer text-light-700"
                    htmlFor={name}
                    onClick={onClick}
                >
                    <TextElement>{label}</TextElement>
                </label>
            </div>
        </div>
    );
};
