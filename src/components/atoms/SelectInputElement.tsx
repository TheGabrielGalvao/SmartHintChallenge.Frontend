import { Slot } from "@radix-ui/react-slot";
import {
    ButtonHTMLAttributes,
    ChangeEvent,
    ChangeEventHandler,
    InputHTMLAttributes,
    ReactNode,
    SelectHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import { OptionItem } from "../../utils/types/Option";
import { tm } from "../../utils/helper/tailwindHelper";

export interface SelectInputRootElementProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode;
}

const SelectInputRoot = ({ children, disabled }: SelectInputRootElementProps) => (
    <div className={
        tm(
            {
                "bg-transparent": !disabled,
                "bg-gray-300": disabled,
            },
            "flex items-center gap-3 py-2  h-xl rounded border-2 disabled:border-subtitle border-light w-full focus-within:ring-2 ring-primary"
        )
    }>
        {children}
    </div>
);

interface SelectInputInputProps
    extends SelectHTMLAttributes<HTMLSelectElement> {
    options?: OptionItem[];
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    icon?: ReactNode;
    helperText?: string;
    register?: any;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const SelectInputInput = ({
    options,
    onChange,
    ...props
}: SelectInputInputProps) => {


    return (
        <select
            className="w-full h-full pl-2  rounded-lg border-none border-0 outline-0 outline-none bg-transparent flex-1 text-gray-600 text-xs placeholder:text-gray-300"
            {...props}
            {...props.register}
            onChange={onChange}
        >
            <option value="" className="py-4">
                Selecionar
            </option>
            {options?.map((option) => (
                <option key={option.value} value={option.value} className="py-4">
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export interface SelectInputIconProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const SelectInputIcon = ({ children, onClick }: SelectInputIconProps) => {
    return (
        <Slot className="w-6 h-6 text-gray-500" onClick={onClick}>
            {children}
        </Slot>
    );
};

export interface SelectInputMessageProps {
    message?: string;
    variant?: "default";
}

const SelectInputMessage = ({ message, variant }: SelectInputMessageProps) => {
    return <Slot className="w-6 h-6 text-gray-500">{message}</Slot>;
};

SelectInputIcon.displayName = "SelectInput.Icon";
SelectInputInput.displayName = "SelectInput.Input";
SelectInputRoot.displayName = "SelectInput.Root";
SelectInputMessage.displayName = "SelectInput.Message";

export const SelectInputElement = {
    Root: SelectInputRoot,
    Input: SelectInputInput,
    Icon: SelectInputIcon,
    Message: SelectInputMessage,
};
