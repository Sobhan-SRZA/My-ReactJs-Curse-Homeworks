import type { ReactNode } from "react";

interface Probs {
    children: ReactNode;
    onClose: () => void;
}


const Alert = ({ children, onClose }: Probs) => {
    return (
        <div className="alert alert-primary alert-dismissible">
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={onClose}></button>
        </div>
    )
}

export default Alert