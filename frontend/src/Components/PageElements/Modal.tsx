import { FunctionComponent, ReactNode, useState } from "react";

import { IoClose } from "react-icons/io5";

interface IModalProps {
    children: ReactNode;
    onClose: () => void;
}

const Modal = ({ children, onClose }: IModalProps): JSX.Element => {
    return (
        <div className="fixed bottom-1/2 left-1/2 h-fit w-96 -translate-x-1/2 translate-y-1/2  rounded-md border-2 border-slate-500 bg-slate-900">
            <div className="relative">{children}</div>
            <button
                className="absolute top-1 right-1"
                onClick={() => onClose()}
            >
                <IoClose className="text-2xl text-white hover:text-gray-200" />
            </button>
        </div>
    );
};

export default Modal;
