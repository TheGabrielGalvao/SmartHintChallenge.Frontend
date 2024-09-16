import { ReactNode, useContext, useState, createContext } from "react";
import { SidebarElement } from "../components/atoms/SidebarElement";
import { tm } from "../utils/helper/tailwindHelper";
import { ToastElement, ToastElementProps } from "../components/atoms/TostElement";

export interface ILayoutContextData {
    handleSetToast: (config?: ToastElementProps) => void;
    handleSetLoading: (show: boolean) => void;
    toast?: ToastElementProps;
}

export interface ILayoutProviderProps {
    children?: ReactNode;
}

export const LayoutContext = createContext<ILayoutContextData | undefined>(undefined);

export const LayoutProvider = ({ children }: ILayoutProviderProps) => {
    const [toast, setToast] = useState<ToastElementProps>();
    const [loading, setLoading] = useState(false);

    const handleSetToast = (config?: ToastElementProps): void => {
        setToast({
            ...config,
            type: config?.type,
            show: !toast?.show ?? false,
        });
    };

    const handleSetLoading = (show: boolean): void => {
        setLoading(show);
    };

    return (
        <LayoutContext.Provider value={{ handleSetToast, toast, handleSetLoading }}>
            <div className={tm(
                "min-h-screen bg-background font-sans antialiased flex",
            )}>
                {/* <LoaderElement show={loading} /> */}
                <ToastElement {...toast} />
                <SidebarElement />
                <div className="flex w-full p-md">
                    {children}
                </div>
            </div>
        </LayoutContext.Provider>
    );
}

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    }
    return context;
};
