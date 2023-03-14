import { ReactNode } from "react";
import { FormState } from "../../Data/Types/FormState";

interface IFormSubmitProps {
    enabled?: boolean;
    className: string;
    children: ReactNode;
}

const FormSubmit = ({ enabled = true, className, children }: IFormSubmitProps) => {
    return (
        <button type='submit' disabled={!enabled} className={className}>
            {children}
        </button>
    );
};

export default FormSubmit;
