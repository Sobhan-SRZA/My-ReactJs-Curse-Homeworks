import type { ReactNode } from "react";

interface Probs {
    children: ReactNode;
    color?: "primary" |
    "secondary" |
    "success" |
    "danger" |
    "warning" |
    "info" |
    "light" |
    "dark" |
    "link";
    onClick: () => void;
}


const Button = ({ children, onClick, color = "primary" }: Probs) => {
    return (
        <button type="button" className={"btn btn-" + color} onClick={onClick}>{children}</button>
    )
}

export default Button