import { Slot } from "@radix-ui/react-slot";
import {
    ButtonHTMLAttributes,
    ChangeEventHandler,
    InputHTMLAttributes,
    ReactNode,
} from "react";
import { tm } from "../../utils/helper/tailwindHelper";

export interface TextInputRootElementProps extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;

}

const TextInputRoot = ({ children, disabled }: TextInputRootElementProps) => (
    <div className={tm(
        {
            "bg-transparent": !disabled,
            "bg-gray-300": disabled,
        },
        "flex items-center gap-3 py-2 px-3 h-xl rounded border-2 disabled:border-subtitle border-light w-full focus-within:ring-2 ring-primary"
    )}>

        {children}
    </div>
);

export interface TextInputInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    handleChange?: ChangeEventHandler<HTMLInputElement>;
    register?: any;
}

const TextInputInput = ({ ...props }: TextInputInputProps) => {
    return (
        <input
            className={tm(

                "bg-transparent flex-1 outline-none disabled:border-subtitle text-title text-xs placeholder:text-subtitle"
            )}
            {...props}
            {...props.register}
        />
    );
};

export interface TextInputIconProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const TextInputIcon = ({ children, onClick }: TextInputIconProps) => {
    return (
        <Slot className="w-6 h-6 text-title" onClick={onClick}>
            {children}
        </Slot>
    );
};

export interface TextInputMessageProps {
    message?: string;
    variant?: "default";
}

const TextInputMessage = ({ message, variant }: TextInputMessageProps) => {
    return <Slot className="w-6 h-6 text-title">{message}</Slot>;
};

TextInputIcon.displayName = "TextInput.Icon";
TextInputInput.displayName = "TextInput.Input";
TextInputRoot.displayName = "TextInput.Root";
TextInputMessage.displayName = "TextInput.Message";

export const TextInputElement = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Icon: TextInputIcon,
    Message: TextInputMessage,
};
