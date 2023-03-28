import { Children, ReactNode, useState } from "react";

interface IDropDownProps {
    hidden: boolean;
    visibilityFn: (hidden: boolean) => void;
    children?: ReactNode;
}

const DropDown = ({ hidden, visibilityFn, children }: IDropDownProps) => {
    return (
        <div
            className={`${hidden ? "hidden" : ""} absolute right-1/2 z-50 flex w-40 translate-x-1/2 cursor-pointer flex-col items-center pt-2`}
            onMouseEnter={() => visibilityFn(false)}
            onMouseLeave={() => visibilityFn(true)}
        >
            <div className='h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-sky-900'></div>
            <div className=' flex h-fit w-40 flex-col items-center overflow-hidden rounded-xl bg-sky-900'>{children}</div>
        </div>
    );
};

export default DropDown;
