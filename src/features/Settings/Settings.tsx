import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ButtonElement } from "../../components/atoms/ButtonElement"
import { TextElement } from "../../components/atoms/TextElement"
import CustomerService from "../../services/CustomerService";
import { CheckboxElement } from "../../components/atoms/CheckboxElement";
import { useEffect, useState } from "react";
import { SettingsModel } from "../../models/Settings.mode";
import SettingsService from "../../services/SettingsService";

export const Settings = () => {
    const queryClient = useQueryClient();
    const [settingsState, setSettingsState] = useState<SettingsModel>(new SettingsModel())

    const { data: settings } = useQuery(
        { queryKey: ["list-settings"], queryFn: () => SettingsService.getSettings() }
    );

    useEffect(() => {
        if (settings) {
            setSettingsState(settings)
        }
    }, [settings]
    )

    const handleSetSettings = () => {
        const currentState: SettingsModel = { ...settingsState, stateRegistrationForIndividual: !settingsState?.stateRegistrationForIndividual }
        setSettingsState(currentState)
    }

    const handleSaveSettings = async () => {
        await SettingsService.saveSettings(settingsState);
        queryClient.invalidateQueries({
            queryKey: ['list-settings'],
            refetchType: 'active',
        })
    }


    return (
        <main className="w-full p-md bg-white rounded-lg">
            <section className="flex w-full gap-xl flex-col items-center justify-center text-center">
                <div className="w-full flex flex-col justify-between items-center gap-md lg:flex-row">
                    <div className="flex flex-col gap-2 items-start justify-start">
                        <h1 className="text-2xl font-bold">Configurações</h1>
                        <TextElement className="text-md text-subtitle">
                            Consulte e altere as configurações da aplicação
                        </TextElement>
                    </div>
                    <ButtonElement onClick={handleSaveSettings} variant="primary" >Salvar Alterações</ButtonElement>
                </div>

                <div className="flex w-full">
                    <CheckboxElement onClick={handleSetSettings} checked={settingsState?.stateRegistrationForIndividual} label="Inscrição estadual para Pessoa Física" />

                </div>
            </section>
        </main>
    )
} 