import { PiCheck, PiInfo, PiWarning, PiX } from "react-icons/pi";
import { ToastElementProps } from "../../components/atoms/TostElement";

const SUCCESS: ToastElementProps = {
    icon: <PiCheck className="font-bold" />,
    type: "success",
};

const DANGER: ToastElementProps = {
    icon: <PiX className="font-bold" />,
    type: "danger",
};

const WARNING: ToastElementProps = {
    icon: <PiWarning className="font-bold" />,
    type: "warning",
};

const INFO: ToastElementProps = {
    icon: <PiInfo className="font-bold" />,
    type: "info",
};

export const toastyPreset = {
    SUCCESS,
    INFO,
    WARNING,
    DANGER,
};

export const TypeToastMap = {
    error: "border-danger text-danger bg-danger/10",
    success: "border-success text-success bg-success/10",
    warning: "border-warning text-warning bg-warning/10",
    info: "border-info text-info bg-info/10",
    danger: "border-danger text-danger bg-danger/10",
};
