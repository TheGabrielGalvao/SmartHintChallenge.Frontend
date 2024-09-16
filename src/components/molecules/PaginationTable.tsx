import { useState } from "react";
import { BasicTable, BasicTableProps, Column } from "../atoms/BasicTable";
import { DefaultPagination } from "./DefaultPagination";

interface PaginationTableProps extends BasicTableProps<any> {
    columns: Column[];
    data?: any[];
    allowActions?: boolean;
}

export const PaginationTable = ({
    data = [],
    columns,
    allowActions = true,
    actions
}: PaginationTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(event.target.value, 10));
    };

    return (
        <div className="flex items-center justify-center flex-col w-full gap-sm">
            <div className="max-h-96 w-full flex flex-col gap-md">
                <BasicTable
                    data={currentItems}
                    columns={columns}
                    actions={actions}
                />
                {data.length > 5 && <div className="flex flex-1 justify-end">
                    <DefaultPagination handlePageSizeChange={handlePageSizeChange} itemsPerPage={pageSize} totalPages={Math.ceil(data.length / pageSize)} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>}
            </div>
        </div>
    );
};