import { QueryFunctionContext } from "react-query";
import { api } from "../config/api";
import { CustomerModel, ECustomerType } from "../models/Customer.model";
import { AxiosError, AxiosResponse } from "axios";
import { isValidUUID } from "../utils/stringHelper";

const API_URL = "Customer";

export default new (class CustomerService {

    async getAll(): Promise<CustomerModel[]> {
        const { data } = await api.get<CustomerModel[]>(API_URL);
        return data;
    }

    async getByUuid({ queryKey }: QueryFunctionContext): Promise<CustomerModel> {
        const uuid = queryKey[1] as string;
        const { data } = await api.get<CustomerModel>(`${API_URL}/${uuid}`);
        return data;
    }

    async beforeSave(data: CustomerModel): Promise<CustomerModel> {
        const normalizedData = {
            ...data,
            name: data.name,
            email: data.email,
            phone: data.phone,
            type: Number(data.type),
            cpfCnpj: data.cpfCnpj,
            free: data.free,
            status: Number(data.status)
        }

        normalizedData.stateRegistration !== "" ? data.stateRegistration : undefined

        normalizedData.confirmPassword = undefined


        if (data.type === ECustomerType["Pessoa Física"]) {
            normalizedData.gender = Number(data.gender)
        }

        if (data.type === ECustomerType["Pessoa Jurídica"]) {
            normalizedData.birthday = undefined
            normalizedData.gender = undefined
            normalizedData.password = undefined
        }




        return normalizedData
    }

    async saveCustomer(data: CustomerModel): Promise<{ data: CustomerModel | null, error?: string }> {
        try {
            const normalizedData = await this.beforeSave(data)
            let response: AxiosResponse<CustomerModel>;
            if (isValidUUID(data.uuid ?? "")) {
                response = await api.put<CustomerModel>(
                    `${API_URL}/${data.uuid}`,
                    normalizedData,
                );
            } else {
                response = await api.post<CustomerModel>(API_URL, normalizedData);
            }

            return { data: response.data };
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status === 400) {
                    return { data: null, error: error.response.data.message };
                }
            }
            return { data: null, error: 'Erro inesperado ao salvar cliente.' };
        }
    }

    async block(uuid: string): Promise<void> {
        await api.patch(`${API_URL}/block/${uuid}`);
    }
})();
