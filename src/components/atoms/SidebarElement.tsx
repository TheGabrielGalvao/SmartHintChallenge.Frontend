import { ReactNode, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { PiCaretRight } from "react-icons/pi";
import { TbHexagonLetterZ } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { tm } from "../../utils/helper/tailwindHelper";

interface SidebarElementProps {
    open?: boolean
    children?: ReactNode | [];
}

export const SidebarElement = ({ children }: SidebarElementProps) => {

    const [open, setOpen] = useState(false);

    return (
        <aside
            className={tm(
                "max-h-screen h-screen p-5  pt-0 relative duration-300 flex flex-col text-2xl py-0 px-1 bg-card shadow-default shadow-lg border-r border-r-default",
                {
                    "w-20": !open,
                    "w-56": open,
                },
            )}
        >
            <nav className="flex flex-col w-full items-start justify-between h-full p-1">
                <PiCaretRight
                    className={tm(
                        "absolute cursor-pointer -right-3 top-5  bg-primary text-menuTextActive border-2 border-menuTextActive rounded-full font-bold",
                        {
                            "rotate-180": open,
                        }
                    )}
                    size={25}
                    onClick={() => setOpen(!open)}
                />
                <SidebarSection open={open}>
                    <SidebarSectionItem open={open}>
                        <>
                            <span
                                className={tm("cursor-pointer duration-500  ", {
                                    "rotate-[360deg] bg-transparent text-primary": open,
                                    "text-menuTextActive": !open,
                                })}
                            >
                                <TbHexagonLetterZ size={32} />

                            </span>
                            <span className={tm(
                                "text-title origin-left text-sm duration-200 bg-transparent font-semibold",
                                {
                                    "scale-0 ": !open,
                                    "hover:text-title/80": open,
                                }
                            )}>Teste
                            </span>
                        </>
                    </SidebarSectionItem>
                </SidebarSection>
                <SidebarSection open={open}>
                    <SidebarSectionItem open={open} label="Clientes" route="/customer" icon={<FaAddressBook size={32} />} />
                    <SidebarSectionItem open={open} label="Ajustes" route="/settings" icon={<FaGear size={32} />} />
                </SidebarSection>
                <SidebarSection open={open}>

                </SidebarSection>


            </nav>
        </aside >
    )
}

const SidebarSection = ({ children }: SidebarElementProps) => {
    return (
        <ul className="flex flex-col w-full items-center">
            {children}
        </ul>
    )
}

interface SidebarSectionItemProps extends SidebarElementProps {
    icon?: ReactNode;
    label?: string | ReactNode;
    route?: string
    exact?: boolean
}
const SidebarSectionItem = ({ children, open, icon, label, route, exact = true }: SidebarSectionItemProps) => {

    const renderNode = (menuItem: SidebarSectionItemProps) => {
        return (
            menuItem.route
                ? <NavLink
                    to={menuItem?.route || ""}
                    end={menuItem?.exact}
                    className={({ isActive, isPending }) =>
                        tm("flex w-full items-center p-3 rounded-lg", {
                            "justify-center": !open,
                            "justify-start gap-4": open,
                            "text-primary bg-primary/10": isActive,
                            "text-menuText bg-transparent": isPending,
                        })
                    }
                >
                    <>
                        {menuItem?.icon}
                        <span
                            className={tm("origin-left duration-200 text-inherit", {
                                hidden: !open,
                                block: open,
                            })}
                        >
                            {menuItem?.label}
                        </span>
                    </>
                </NavLink>
                : <>
                    {icon}
                    <span
                        className={tm("origin-left duration-200", {
                            hidden: !open,
                            block: open,
                        })}
                    >
                        {label}
                    </span>
                </>
        )
    }

    return (
        <li
            className={tm(
                "flex items-center w-full text-menuText hover:text-primary hover:bg-primary/10 hover:text-menuTextActtive transition-all duration-300 cursor-pointer p-3 rounded-lg",
                {
                    "justify-center": !open,
                    "justify-start gap-4": open,
                },
            )}
        >
            {children
                ? children
                : renderNode({ icon: icon, label: label, open: open, route: route, exact: exact })
            }
        </li>
    )
}