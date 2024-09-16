import clsx from "clsx";
import { ChangeEventHandler, HtmlHTMLAttributes, ReactNode } from "react";
import { TextElement } from "../atoms/TextElement";
import { TextInputElement, TextInputInputProps } from "../atoms/TextInputElement";


interface TextInputProps extends TextInputInputProps {
    type?: string;
    id?: string;
    name?: string;
    label?: string | ReactNode;
    placeholder?: string;
    icon?: ReactNode;
    handleChange?: ChangeEventHandler<HTMLInputElement>;
    register?: any;
    helperText?: string;
    [key: string]: any;
}

export const TextInput = ({
    type,
    id,
    name,
    label,
    placeholder,
    icon,
    register,
    helperText,
    className,
    disabled
}: TextInputProps) => {
    return (
        <label
            htmlFor={name}
            className={clsx("flex flex-col gap-0.5 h-2xl", className)}
        >
            <TextElement className="" size="md">
                {label}
            </TextElement>
            <TextInputElement.Root disabled={disabled}>
                {icon && <TextInputElement.Icon>{icon}</TextInputElement.Icon>}
                <TextInputElement.Input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    register={register}
                    disabled={disabled}
                />
            </TextInputElement.Root>
            <TextElement className="text-red-400 px-2" size="sm">
                {helperText}
            </TextElement>
        </label>
    );
};
