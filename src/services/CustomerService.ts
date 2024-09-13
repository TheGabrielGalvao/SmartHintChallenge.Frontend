import { api } from "../config/api";
import { CustomerModel } from "../models/Customer.model";

const API_URL = "Customer";

export default new (class CustomerService {

    async getAll(): Promise<CustomerModel[]> {
        const { data } = await api.get<CustomerModel[]>(API_URL);
        return data;
    }
})();
