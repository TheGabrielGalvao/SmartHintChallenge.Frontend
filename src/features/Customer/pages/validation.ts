import * as yup from "yup";
import { ECustomerType } from "../../../models/Customer.model";
import { invalidEmail, lengthMatch, passwordMatch, required, requiredPF } from "../../../utils/helper/msgHelper";

export const customerValidation = yup.object().shape({
    type: yup.string().required(),
    name: yup.string()
        .max(150, () => lengthMatch("Nome"))
        .required(() => required("Nome")),

    cpfCnpj: yup.string()
        .required(() => required("CPF/CNPJ")),

    email: yup.string()
        .email(() => invalidEmail())
        .max(150, () => lengthMatch("Email"))
        .required(() => required("Email")),

    phone: yup.string()
        .matches(/^[0-9]{11}$/, "O telefone deve conter exatamente 11 dígitos")
        .required(() => required("Teefone")),

    password: yup.string().when("type", (type, schema) => {
        return type[0].toString() === Number(ECustomerType["Pessoa Física"]).toString()
            ? schema.required(() => requiredPF("Senha"))
            : schema;
    }),

    confirmPassword: yup.string().when("type", (type, schema) => {
        return type[0].toString() === Number(ECustomerType["Pessoa Física"]).toString()
            ? schema.required(() => passwordMatch())
            : schema;
    }),

    birthday: yup.string().when("type", (type, schema) => {
        return type[0].toString() === Number(ECustomerType["Pessoa Física"]).toString()
            ? schema.required(() => requiredPF("Data de Nascimento"))
            : schema;
    }),

    gender: yup.string().when("type", (type, schema) => {
        return type[0].toString() === Number(ECustomerType["Pessoa Física"]).toString()
            ? schema.required(() => requiredPF("Gênero"))
            : schema;
    }),


});
