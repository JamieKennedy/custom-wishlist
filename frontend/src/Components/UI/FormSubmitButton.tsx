import { ReactNode } from "react";
import { SpinnerCircular } from "spinners-react";
import { FormState } from "../../Data/Types/FormState";

interface IFormSubmitProps {
    defaultStateText: string;
    enabled?: boolean;
    formState: FormState;
    className?: string;
    children?: ReactNode;
}

const FormSubmit = ({ defaultStateText, enabled = true, formState, className, children }: IFormSubmitProps) => {
    const disabled: boolean = !enabled || formState !== FormState.default;

    const buttonElement = (): JSX.Element => {
        switch (formState) {
            case FormState.default:
                return <p>{defaultStateText}</p>;
            case FormState.pending:
                return (
                    <div className='w-full'>
                        <SpinnerCircular color='#ffffff' secondaryColor='#747a7a' thickness={300} size={20} style={{ margin: "auto" }} />
                    </div>
                );
            default:
                return <p>{defaultStateText}</p>;
        }
    };

    const borderClass: string = disabled ? "border-gray-400" : "border-white";

    return (
        <button
            type='submit'
            disabled={disabled}
            className={`${borderClass} mx-auto mb-5 block h-8 w-2/3 cursor-pointer rounded-md border border-white  text-white`}
        >
            {buttonElement()}
        </button>
    );
};

export default FormSubmit;
