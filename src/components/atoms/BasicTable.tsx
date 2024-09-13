import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { orderBy } from "lodash";
import { TextElement } from "./TextElement";
import { PiCaretDown, PiCaretUp } from "react-icons/pi";

export interface Column {
    name: string;
    label: string;
    order: number;
    filter?: boolean;
    sortable?: boolean;
    bodyShape?: (row: any) => ReactNode;
}

export interface BasicTableProps<T> {
    columns: Column[];
    data?: T[];
    actions?: (row: any) => ReactNode;
}

interface OrderProps {
    field?: string;
    order?: "asc" | "desc";
}

export const BasicTable = ({
    columns,
    data,
    actions,
}: BasicTableProps<any>) => {
    const [dataList, setDataList] = useState<any[]>([]);
    const [order, setOrder] = useState<OrderProps>({});

    useEffect(() => {
        const orderedData = orderBy(data, [order.field], order.order);
        setDataList(orderedData as []);
    }, [order, data]);

    const handleSetOrder = (field: string) => {
        if (!order?.field || order.field !== field) {
            setOrder({ field: field, order: "asc" });
        } else if (order.order === "asc" && field === order.field) {
            setOrder({ field: field, order: "desc" });
        } else if (order.order === "desc" && field === order.field) {
            setOrder({});
        }
    };

    return (
        <table className="min-w-full text-left text-sm font-light ">
            <thead>
                <tr className="border-y border-borderColor bg-primary/10">
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className="cursor-pointer p-4 transition-colors hover:bg-primary/10"
                            onClick={() =>
                                handleSetOrder(column.sortable ? column.name : "")
                            }
                        >
                            <TextElement
                                size="md"
                                className={clsx(
                                    {
                                        "text-primary": column.name === order?.field,
                                        "text-title": column.name !== order?.field,
                                    },
                                    "flex items-center justify-start gap-2 font-semibold leading-none"
                                )}
                            >
                                {column.label}
                                {order &&
                                    order?.order &&
                                    order.field === column.name ? (
                                    order.order === "asc" ? (
                                        <PiCaretDown
                                            strokeWidth={2}
                                            className="h-4 w-4 font-bold"
                                        />
                                    ) : (
                                        <PiCaretUp
                                            strokeWidth={2}
                                            className="h-4 w-4 font-bold"
                                        />
                                    )
                                ) : (
                                    ""
                                )}
                            </TextElement>
                        </th>
                    ))}
                    {actions && (
                        <th className="cursor-default p-4 transition-colors ">
                            <TextElement
                                size="md"
                                className="flex items-end justify-center gap-2 font-semibold leading-none text-title"
                            >
                                Ações
                            </TextElement>
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {dataList?.map((item, index) => (
                    <tr
                        key={index}
                        className="border-b border-borderColor/20 hover:bg-background"
                    >
                        {columns.map((column) => (
                            <td
                                key={column.name}
                                className="whitespace-nowrap px-6 py-0 font-medium text-title"
                            >
                                {column.bodyShape
                                    ? column.bodyShape(item)
                                    : item[column.name]}
                            </td>
                        ))}
                        {actions && (
                            <td className="flex gap-2 justify-center items-center whitespace-nowrap px-6 py-4 font-medium">
                                {actions(item)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
