import React, { ChangeEventHandler } from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ButtonElement } from "../atoms/ButtonElement";
import { SelectInputElement } from "../atoms/SelectInputElement";
import { TextElement } from "../atoms/TextElement";

interface DefaultPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    handlePageSizeChange?: ChangeEventHandler<HTMLSelectElement>
}

export function DefaultPagination({
    totalPages,
    currentPage,
    onPageChange,
    itemsPerPage,
    handlePageSizeChange
}: DefaultPaginationProps) {
    const next = () => {
        if (currentPage === totalPages) return;
        onPageChange(currentPage + 1);
    };

    const prev = () => {
        if (currentPage === 1) return;
        onPageChange(currentPage - 1);
    };

    return (
        <div className="flex items-center px-xs w-full gap-4">
            <div className="flex flex-1 gap-md items-center justify-end">
                <TextElement size="sm" className="font-normal text-title">
                    Página {currentPage} de {totalPages}
                </TextElement>
                <div className="flex gap-2">
                    <ButtonElement
                        className="flex items-center gap-2 text-primary py-sm border-primary outline"
                        onClick={prev}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </ButtonElement>
                    <div className="w">
                        <SelectInputElement.Root>
                            <SelectInputElement.Input
                                id="pageSize"
                                name="pageSize"
                                placeholder=""
                                options={[
                                    { value: 5, label: "5" },
                                    { value: 10, label: "10" },
                                    { value: 15, label: "15" },
                                    { value: 20, label: "20" },
                                ]}
                                defaultValue={5}
                                value={itemsPerPage}
                                register=""
                                onChange={handlePageSizeChange}
                                disabled

                            />
                        </SelectInputElement.Root>
                    </div>
                    <ButtonElement
                        className="flex items-center gap-2 text-primary py-sm border-primary outline"
                        onClick={next}
                        disabled={currentPage === totalPages}
                    >
                        Próxima
                    </ButtonElement>
                </div>
            </div>
        </div>
    );
}