import { CustomerModel, ECustomerStatus, ECustomerType, EGender } from "../../../models/Customer.model"
import { customerValidation } from "./validation";
import { TextInput } from "../../../components/molecules/TextInput";
import { ButtonElement } from "../../../components/atoms/ButtonElement";
import { TextElement } from "../../../components/atoms/TextElement";
import { BaseForm } from "../../../components/molecules/BaseForm";
import CustomerService from "../../../services/CustomerService";
import { useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import { isValidUUID } from "../../../utils/stringHelper";
import { SelectInput } from "../../../components/molecules/SelectInput";
import { enumToOptionItemList } from "../../../utils/helper/enum";
import { CheckboxElement } from "../../../components/atoms/CheckboxElement";
import { useEffect, useState } from "react";
import SettingsService from "../../../services/SettingsService";
import { useLayout } from "../../../context/LayoutProvider";
import { toastyPreset } from "../../../utils/helper/toastyHelper";
import { MSG_SUCCESS } from "../../../utils/helper/msgHelper";


export const CustomerForm = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isention, setIsention] = useState(false)
    const [stateRegistrationRole, setStateRegistrationRole] = useState(false)
    const [customerType, setCustomerType] = useState<ECustomerType>(ECustomerType["Pessoa Física"])
    const [defaultValues, setDefaultValues] = useState<CustomerModel>(new CustomerModel())
    const { uuid } = useParams();
    const { handleSetToast } = useLayout();

    const { data: settings } = useQuery(
        ["list-settings"],
        () => SettingsService.getSettings(),
        {
            retry: false,
            enabled: true,

        }
    );

    useQuery(
        ["customer", uuid],
        CustomerService.getByUuid,
        {
            retry: false,
            enabled: isValidUUID(uuid ?? ""),
            onSuccess: (data) => {
                data.confirmPassword = data.password
                setIsention(data.free)
                setCustomerType(data.type)
                setDefaultValues(data)
            }
        },

    );

    useEffect(() => {
        const condition = (Number(customerType) as ECustomerType === ECustomerType["Pessoa Física"] && !settings?.stateRegistrationForIndividual) || (Number(customerType) as ECustomerType === ECustomerType["Pessoa Jurídica"] && isention)
        setStateRegistrationRole(condition)
    }, [customerType, isention])




    const handleSaveCustomer = async (data: CustomerModel) => {


        const customerUuid = uuid && isValidUUID(uuid) ? uuid : undefined

        const objectSave: CustomerModel = {
            ...data,
            type: Number(data.type) as ECustomerType,
            gender: Number(data.gender) as EGender,
            uuid: customerUuid,
            status: Number(data.status) as ECustomerStatus,
        };

        objectSave.free = (objectSave.type === ECustomerType["Pessoa Física"] && !settings?.stateRegistrationForIndividual) || (objectSave.type === ECustomerType["Pessoa Jurídica"] && isention)

        const result = await CustomerService.saveCustomer(objectSave);


        if (result.error) {
            handleSetToast({
                ...toastyPreset.DANGER,
                message: result.error.toString()
            });

            return
        }
        else {
            queryClient.invalidateQueries(["list-customers"]);
            handleSetToast({
                ...toastyPreset.SUCCESS,
                message: MSG_SUCCESS
            });


            navigate("/customer");
        }

    }

    const handleSetIsention = () => {
        if (customerType === ECustomerType["Pessoa Jurídica"]) {
            setIsention(!isention)
        }
    }

    const handleCustomerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        setCustomerType(Number(event.target.value) as ECustomerType);
    };


    return (
        <main className="w-full h-full p-md bg-white rounded-lg flex-1 pb-md">
            <section className="flex w-full gap-lg flex-col items-center justify-center text-center">
                <div className="w-full flex flex-col justify-between items-center gap-md lg:flex-row">
                    <div className="flex flex-col gap-2 items-start justify-start">
                        <h1 className="text-2xl font-bold">Cadastro de Clientes</h1>
                        <TextElement className="text-md text-subtitle">
                            Preencha os dados e crie ou atualize dados de seus clientes
                        </TextElement>
                    </div>
                </div>
                <BaseForm
                    className="flex flex-col items-center justify-center w-full px-lg  gap-5"
                    onSubmit={handleSaveCustomer}
                    validationSchema={customerValidation}
                    defaultValues={defaultValues}
                >
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        label="Nome/Razão Social"
                        placeholder="Nome/Razão Social"
                        className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                    />
                    <div className="flex gap-2 w-full items-center justify-center">
                        <TextInput
                            type="text"
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                        />
                        <TextInput
                            type="text"
                            id="phone"
                            name="phone"
                            label="Telefone"
                            placeholder="Telefone"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                        />
                    </div>
                    <div className="flex gap-2 w-full items-center justify-center">
                        <SelectInput
                            type="select"
                            id="type"
                            name="type"
                            label="Tipo de Cliente"
                            placeholder="Tipo de Cliente"
                            className="flex flex-col items-start w-96 placeholder:text-gray-900 text-gray-900"
                            options={enumToOptionItemList(ECustomerType)}
                            onChange={handleCustomerTypeChange}
                        />
                        <TextInput
                            type="text"
                            id="cpfCnpj"
                            name="cpfCnpj"
                            label="CPF/CNPJ"
                            placeholder="CPF/CNPJ"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                        />
                        <TextInput
                            type="text"
                            id="stateRegistration"
                            name="stateRegistration"
                            disabled={stateRegistrationRole}
                            label={
                                <div className="grid grid-cols-2  items-center justify-center  " >
                                    Inscrição Estadual
                                    <CheckboxElement className="" onClick={handleSetIsention} checked={isention} label="Isento" disabled={customerType === ECustomerType["Pessoa Física"]} />
                                </div>
                            }
                            placeholder="Inscrição Estadual"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                        />
                    </div>
                    <div className="flex gap-2 w-full items-center justify-center">
                        <SelectInput
                            type="select"
                            id="gender"
                            name="gender"
                            label="Gênero"
                            placeholder="Gênero"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                            options={enumToOptionItemList(EGender)}
                            disabled={customerType === ECustomerType["Pessoa Jurídica"]}
                        />
                        <TextInput
                            type="date"
                            id="birthday"
                            name="birthday"
                            label="Data de Nascimento"
                            placeholder="Data de Nascimento"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                            disabled={customerType === ECustomerType["Pessoa Jurídica"]}
                        />
                        <SelectInput
                            type="select"
                            id="status"
                            name="status"
                            label="Status"
                            placeholder="Status"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                            options={enumToOptionItemList(ECustomerStatus)}
                            disabled={customerType === ECustomerType["Pessoa Jurídica"]}
                        />
                    </div>
                    <div className="flex gap-2 w-full items-center justify-center">
                        <TextInput
                            type="password"
                            id="password"
                            name="password"
                            label="Senha"
                            placeholder="Senha"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                            disabled={customerType === ECustomerType["Pessoa Jurídica"]}
                        />
                        <TextInput
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirmação de Senha"
                            placeholder="Confirmação de Senha"
                            className="flex flex-col items-start w-full placeholder:text-gray-900 text-gray-900"
                            disabled={customerType === ECustomerType["Pessoa Jurídica"]}
                        />
                    </div>

                    <div className="flex w-full gap-md mt-xs">
                        <ButtonElement variant="default" type="button" className="w-full py-xs" onClick={() => navigate("/customer")}>
                            Cancelar
                        </ButtonElement>
                        <ButtonElement variant="primary" type="submit" className="w-full py-xs">
                            Salvar Cliente
                        </ButtonElement>
                    </div>
                </BaseForm>
            </section>

        </main>
    )
}