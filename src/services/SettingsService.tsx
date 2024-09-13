import { AxiosResponse } from "axios";
import { SettingsModel } from "../models/Settings.mode";
import { api } from "../config/api";


const API_URL = "Settings";

export default new (class SettingsService {

    async getSettings(): Promise<SettingsModel> {
        const { data } = await api.get<SettingsModel>(API_URL);
        return data;
    }

    async saveSettings(data: SettingsModel): Promise<SettingsModel> {
        const response: AxiosResponse<SettingsModel> = await api.patch<SettingsModel>(
            API_URL,
            data,
        );
        return response.data;
    }
})();
