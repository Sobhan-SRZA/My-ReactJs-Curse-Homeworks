import type { ReactNode } from "react";

interface Probs {
    children: ReactNode;
    onClose?: () => void;
}


const Alert = ({ children, onClose }: Probs) => {
    let class_name = "alert alert-primary";
    if (onClose)
        class_name += " alert-dismissible fade show";

    return (
        <div className={class_name} role="alert">
            {children}
            {onClose && <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={onClose}></button>}
        </div >
    )
}

export default Alert;