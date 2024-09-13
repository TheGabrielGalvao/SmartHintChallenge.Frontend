import clsx from "clsx";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { TextElement } from "./TextElement";

export interface CheckboxElementProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    checked?: boolean;
    onCheck?(): void;
    onClick?(): void
}

export const CheckboxElement = ({
    className,
    id,
    name,
    label,
    checked,
    onClick,
    onCheck = () => { },
    ...props
}: CheckboxElementProps) => {
    return (
        <div>
            <div
                className={clsx(
                    { className },
                    "flex gap-3 justify-center items-center"
                )}
            >
                <input
                    className={clsx(
                        "float-left h-[1.5rem] w-[1.5rem] appearance-none rounded-[0.375rem] border-[0.125rem] border-solid border-blue-100 outline-none before:pointer-events-none before:absolute before:h-[1.125rem] before:w-[1.125rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px 0px 0px 13px transparent] before:content-[''] checked:border-primary/50 checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.375rem] checked:after:block checked:after:h-[0.84375rem] checked:after:w-[0.421875rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px 0px 0px 13px rgba(0, 0, 0, 0.6)] focus:shadow-none focus:transition-[border-color 0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px 0px 0px 13px rgba(0, 0, 0, 0.6)] focus:before:transition-[box-shadow 0.2s, transform 0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[1.125rem] focus:after:w-[1.125rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px 0px 0px 13px #3b71ca] checked:focus:before:transition-[box-shadow 0.2s, transform 0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.375rem] checked:focus:after:h-[0.84375rem] checked:focus:after:w-[0.421875rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px 0px 0px 13px rgba(255, 255, 255, 0.4)] dark:checked:focus:before:shadow-[0px 0px 0px 13px #3b71ca]"
                    )}
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onClick={onClick}
                    {...props}
                />
                <label
                    className="w-full hover:cursor-pointer"
                    htmlFor={name}
                    onClick={() => onClick}
                >
                    <TextElement onClick={onClick}>{label}</TextElement>
                </label>
            </div>
        </div>
    );
};
