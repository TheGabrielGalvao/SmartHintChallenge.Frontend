import { AxiosResponse } from "axios";
import { Params } from "react-router-dom";
import { api } from "../config/api";
import { OptionItem } from "../utils/types/Option";
import { QueryFunctionContext } from "@tanstack/react-query";

interface IBaseService<T> {
    getUrl(): string;
    getHeaders(): Record<string, string>;
    getParamId(): keyof T;
    getAll(): Promise<T[]>;
    getById(uuid: string): Promise<T>;
    beforeSave(data: BeforeSaveParams<T>): Promise<T>;
    create(data: Omit<T, "uuid">): Promise<T>;
    remove(uuid: string): Promise<void>;
}

export type BeforeSaveParams<T> = {
    data: T;
    paramsPage: Readonly<Params<string>>;
};

export type TableParams<T> = {
    formValues: T;
    pageable: {
        activePage: number;
        maxSize: number;
    };
};

export abstract class BaseService<T> implements IBaseService<T> {
    private url: string;
    private paramId?: keyof T;

    constructor(url: string, paramId?: keyof T) {
        this.url = url;
        this.paramId = paramId;
    }

    getUrl = () => this.url;

    getParamId(): keyof T {
        return this.paramId as keyof T;
    }

    getHeaders = (): Record<string, string> => {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
        };
    };

    beforeSave = async ({ data }: BeforeSaveParams<T>): Promise<T> => {
        return data
    };


    async getAll(): Promise<T[]> {
        const { data } = await api.get<T[]>(this.url, {
            headers: this.getHeaders(),
        });
        return data;
    }

    async getById(uuid: string): Promise<T> {
        const { data } = await api.get<T>(`${this.url}/${uuid}`);
        return data;
    }

    find = async ({ queryKey }: QueryFunctionContext): Promise<T> => {
        const uuid = queryKey[1] as string;

        if (uuid) {
            const { data } = await api.get<T>(`${this.url}/${uuid}`, {
                headers: this.getHeaders(),
            });
            return data;
        } else {
            return {} as Promise<T>;
        }
    };

    getOptions = async (): Promise<OptionItem[]> => {
        try {
            const headers = this.getHeaders(); // Obtenha os cabeçalhos antes de fazer a chamada
            const { data } = await api.get<OptionItem[]>(`${this.url}/option-items`, {
                headers,
            });
            return data;
        } catch (error) {
            console.error("Erro ao obter as opções:", error);
            return [];
        }
    };

    async create(data: T): Promise<T> {
        const normalizedData = await this.beforeSave({ data, paramsPage: {} })
        const response: AxiosResponse<T> = await api.post<T>(this.url, normalizedData, {
            headers: this.getHeaders(),
        });
        return response.data;
    }

    async update(uuid: string, data: T): Promise<T> {
        const response: AxiosResponse<T> = await api.put<T>(
            `${this.url}/${uuid}`,
            data,
            { headers: this.getHeaders() }
        );
        return response.data;
    }

    async remove(uuid: string): Promise<void> {
        await api.delete(`${this.url}/${uuid}`, { headers: this.getHeaders() });
    }
}
