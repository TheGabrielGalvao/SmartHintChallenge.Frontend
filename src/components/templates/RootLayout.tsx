import { tm } from "../../utils/helper/tailwindHelper"
import { SidebarElement } from "../atoms/SidebarElement"

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={tm(
            "min-h-screen bg-background font-sans antialiased flex",
        )}>
            <SidebarElement />
            <div className="flex w-full p-md">
                {children}
            </div>
        </div>
    )
}