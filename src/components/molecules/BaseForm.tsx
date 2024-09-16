import React, { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObject, ObjectSchema } from "yup";

type BaseFormProps<T> = {
    onSubmit: (data: T) => Promise<void>;
    resetForm?: boolean
    validationSchema?: ObjectSchema<any, AnyObject, any, "">;
    defaultValues?: Partial<T> | any;
    children: ReactNode;
    className?: string;
};

export const BaseForm = <T extends Record<string, any>>({
    onSubmit,
    validationSchema,
    defaultValues,
    children,
    className,
    resetForm = true
}: BaseFormProps<T>) => {
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
    } = useForm<T>({
        resolver: yupResolver(
            validationSchema as ObjectSchema<any, AnyObject, any, "">
        ),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset, resetForm]);

    const renderChild = (child: ReactNode): ReactNode => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const { name } = child.props;
        const error = errors[name]?.message ?? "";

        if (React.Children.count(child.props.children) > 0) {
            const children = React.Children.map(
                child.props.children as React.ReactElement[],
                (subChild: ReactNode) => {
                    if (React.isValidElement(subChild)) {
                        if (
                            (subChild.type === "input" ||
                                subChild.type === "select" ||
                                subChild.type === "textarea") &&
                            subChild.props.name
                        ) {
                            const subChildName = subChild.props.name;
                            const subChildError = errors[subChildName]?.message ?? "";

                            return React.cloneElement(subChild, {
                                ...subChild.props,
                                register: register(subChildName),
                                helperText: subChildError,
                            });
                        }

                        return renderChild(subChild);
                    }

                    return subChild;
                }
            );

            return React.cloneElement(child, child.props, children);
        }

        return React.cloneElement(child, {
            ...(child.props as any),
            register: register(name),
            helperText: error,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            {React.Children.map(children, renderChild)}
        </form>
    );
};
