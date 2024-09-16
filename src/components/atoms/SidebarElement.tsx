import { ReactNode, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { PiCaretRight } from "react-icons/pi";
import { TbHexagonLetterZ } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { tm } from "../../utils/helper/tailwindHelper";
import { TextElement } from "./TextElement";

interface SidebarElementProps {
    open?: boolean;
    children?: ReactNode | [];
    className?: string
}

export const SidebarElement = ({ children }: SidebarElementProps) => {
    const [open, setOpen] = useState(false);

    return (
        <aside
            className={tm(
                "max-h-screen h-screen p-5 pt-0 relative duration-300 flex flex-col text-2xl py-0 px-1 bg-card shadow-default shadow-lg border-r border-r-default",
                {
                    "w-20": !open,
                    "w-56": open,
                },
            )}
        >
            <nav className="flex flex-col w-full items-start justify-between h-full p-1">
                <PiCaretRight
                    className={tm(
                        "absolute cursor-pointer -right-3 top-5 bg-primary text-menuTextActive border-2 border-menuTextActive rounded-full font-bold transition-transform duration-300",
                        {
                            "rotate-180": open,
                        }
                    )}
                    size={25}
                    onClick={() => setOpen(!open)}
                />
                <SidebarSection open={open} className="w-full flex items-center justify-center px-lg ">
                    <SidebarSectionItem open={open} className="flex items-center justify-center ">
                        <div className="flex items-center justify-center gap-sm  w-full">
                            <TextElement className={tm(
                                "text-title origin-left text-sm duration-200 bg-transparent font-semibold",
                                {
                                    "scale-0": !open,
                                    "hover:text-title/80": open,
                                }
                            )}>
                                SmartHint
                            </TextElement>
                        </div>
                    </SidebarSectionItem>
                </SidebarSection>
                <SidebarSection open={open}>
                    <SidebarSectionItem open={open} label="Clientes" route="/customer" icon={<FaAddressBook size={24} />} />
                    <SidebarSectionItem open={open} label="Ajustes" route="/settings" icon={<FaGear size={24} />} />
                </SidebarSection>
                <SidebarSection open={open} />
            </nav>
        </aside>
    );
}

const SidebarSection = ({ children, className }: SidebarElementProps) => {
    return (
        <ul className={tm("flex flex-col flex-1 w-full items-center ", className)}>
            {children}
        </ul>
    );
}

interface SidebarSectionItemProps extends SidebarElementProps {
    icon?: ReactNode;
    label?: string | ReactNode;
    route?: string;
    exact?: boolean;
}

const SidebarSectionItem = ({ children, open, icon, label, route, className, exact = true }: SidebarSectionItemProps) => {
    const renderNode = (menuItem: SidebarSectionItemProps) => {
        return (
            menuItem.route
                ? <NavLink
                    to={menuItem?.route || ""}
                    end={menuItem?.exact}
                    className={({ isActive, isPending }) =>
                        tm("flex w-full items-center p-sm rounded-lg transition-all duration-300", {
                            "justify-center": !open,
                            "justify-start gap-4": open,
                            "text-primary bg-primary/10": isActive,
                            "text-menuText bg-transparent": isPending,
                        }, className)
                    }
                >
                    <>
                        {menuItem?.icon}
                        <TextElement
                            className={tm("origin-left duration-200 text-inherit", {
                                hidden: !open,
                                block: open,
                            })}
                        >
                            {menuItem?.label}
                        </TextElement>
                    </>
                </NavLink>
                : <>
                    {icon}
                    <TextElement
                        className={tm("origin-left duration-200", {
                            hidden: !open,
                            block: open,
                        })}
                    >
                        {label}
                    </TextElement>
                </>
        );
    }

    return (
        <li
            className={tm(
                "flex items-center w-full text-menuText hover:text-primary hover:bg-primary/10 hover:text-menuTextActive transition-all duration-300 cursor-pointer rounded-lg",
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
    );
}
