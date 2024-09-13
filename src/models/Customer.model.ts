export class CustomerModel {
    uuid?: string
    name: string
    email: string
    type: ECustomerType
    createdAt: string
    stateRegistration?: string
    free: boolean
    birthday?: Date
    gender?: EGender
    password?: string
    status: ECustomerStatus

    constructor() {
        this.status = ECustomerStatus.Ativo
        this.name = ""
        this.free = true
        this.email = ""
        this.type = ECustomerType["Pessoa Física"]
        this.createdAt = ""
    }
}

export enum ECustomerStatus {
    Bloqueado = 0,
    Ativo = 1
}


export enum EGender {
    Outro = 0,
    Masculino = 1,
    Feminino = 2,
}

export enum ECustomerType {
    "Pessoa Física" = 1,
    "Pessoa Jurídica" = 2
}