import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IDropDownLinkItemProps {
    text: string;
    icon: ReactNode;
    onClick?: Function;
    path: string;
}

const DropDownLinkItem = ({ text, icon, onClick, path }: IDropDownLinkItemProps) => {
    const onClickHandler = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <Link className='flex h-10 w-full flex-row items-center justify-start bg-transparent hover:bg-white/5' onClick={() => onClickHandler()} to={path}>
            <div className='mx-3 text-white'>{icon}</div>
            <p className='text-center align-middle text-white'>{text}</p>
        </Link>
    );
};

export default DropDownLinkItem;
