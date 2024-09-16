import { Column } from "../../../components/atoms/BasicTable";
import { ButtonElement } from "../../../components/atoms/ButtonElement"
import { TextElement } from "../../../components/atoms/TextElement";
import { PaginationTable } from "../../../components/molecules/PaginationTable"
import { CustomerModel, ECustomerStatus } from "../../../models/Customer.model";
import { dateFormat } from "../../../utils/helper/dateFormat";
import { enumToOptionItemList } from "../../../utils/helper/enum";
import { tm } from "../../../utils/helper/tailwindHelper";
import { OptionItem } from "../../../utils/types/Option";
import CustomerService from "../../../services/CustomerService";
import { PiPencilSimple, PiTrash } from "react-icons/pi";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";


const StatusBody = (row: any) => {
    const statusOptions: OptionItem[] = enumToOptionItemList(ECustomerStatus)
    const status = statusOptions.find(
        (item) => item.value?.toString() === row.status.toString()
    ) as OptionItem;

    return (
        <TextElement
            size="sm"
            className={tm({
                "font-bold bg-success/20 text-success":
                    status.value === ECustomerStatus.Ativo,
                "font-bold bg-danger/10 text-danger":
                    status.value === ECustomerStatus.Bloqueado,
            }, "py-1 px-2 rounded-md uppercase shadow-md"
            )}
        >
            {status?.label}
        </TextElement>
    );
};

export const CustomerList = () => {
    const navigate = useNavigate();

    const { data: customers } = useQuery(
        ["list-customers"],
        () => CustomerService.getAll(),
        {
            retry: false,
            enabled: true
        }

    );

    const columnList: Column[] = [
        {
            name: "name",
            label: "Nome/Razão Social",
            sortable: true,
            order: 1,
        },
        {
            name: "email",
            label: "Email",
            sortable: true,
            order: 2,
        },
        {
            name: "createdAt",
            label: "Data de Cadastro",
            sortable: true,
            order: 3,
            bodyShape: (row: CustomerModel) =>
                row.createdAt ? dateFormat(row.createdAt) : null,
        },
        {
            name: "status",
            label: "Status",
            sortable: true,
            order: 6,
            bodyShape: StatusBody,
        },
    ];
    return (
        <main className="w-full p-md bg-white rounded-lg">
            <section className="flex w-full gap-xl flex-col items-center justify-center text-center">
                <div className="w-full flex flex-col justify-between items-center gap-md lg:flex-row">
                    <div className="flex flex-col gap-2 items-start justify-start">
                        <h1 className="text-2xl font-bold">Clientes</h1>
                        <TextElement className="text-md text-subtitle">Consulte os seus Clientes cadastrados na sua Loja ou realize o cadastro de novos
                            Clientes
                        </TextElement>
                    </div>
                    <ButtonElement variant="primary" onClick={() => navigate("../customer/new")}>Adicionar Cliente</ButtonElement>
                </div>


                <PaginationTable data={customers} columns={columnList}
                    actions={
                        (item: any) =>
                            <div className="flex gap-2">
                                <PiPencilSimple
                                    size={25}
                                    className="cursor-pointer text-primary"
                                    onClick={() =>
                                        navigate(
                                            `../customer/edit/${item.uuid}`

                                        )
                                    }
                                />
                            </div>

                    } />
            </section>
        </main>
    )
}