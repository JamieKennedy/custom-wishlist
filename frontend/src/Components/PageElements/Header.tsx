import { useAtom } from "jotai";
import { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import NavigationConst from "../../Constants/NavigationConst";
import { AppStateAtom } from "../../State/AppState";
import ProfileIcon from "../UI/ProfileIcon";

export const Header = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    return (
        <div className=' relative mx-auto my-10  inline-flex w-11/12 max-w-screen-2xl items-center justify-center'>
            <Link to={NavigationConst.Home}>
                <h1 className='text-5xl text-white'>Custom Wishlist</h1>
            </Link>
            {appState.user && <ProfileIcon />}
        </div>
    );
};

export default Header;
