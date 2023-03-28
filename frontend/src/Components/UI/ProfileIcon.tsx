import { useNavigate, useNavigation } from "react-router";

import { useAtom } from "jotai";
import { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import NavigationConst from "../../Constants/NavigationConst";
import { AppStateAtom } from "../../State/AppState";
import DropDown from "./DropDown";
import DropDownLinkItem from "./DropDownLinkItem";

interface IProfileIconProps {}

const ProfileIcon = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);
    const [dropDownHidden, setDropDownHidden] = useState(true);

    const navigate = useNavigate();

    const setDropDownVisibility = (hidden: boolean) => {
        setDropDownHidden(hidden);
    };

    const logOut = () => {
        setAppState({
            ...appState,
            api: { ...appState.api, token: null },
            user: null,
        });
    };

    return (
        <div className='absolute right-10' onMouseEnter={() => setDropDownVisibility(false)} onMouseLeave={() => setDropDownVisibility(true)}>
            <div className=' flex h-20 w-20 cursor-pointer items-center overflow-hidden  rounded-full border-2 bg-slate-500'>
                <IoPersonSharp className='pt-5 align-middle text-white' size={"6rem"} />
            </div>
            <DropDown hidden={dropDownHidden} visibilityFn={setDropDownVisibility}>
                <DropDownLinkItem text='View profile' icon={<IoPersonSharp />} path={NavigationConst.Profile + appState.user?.id} />
                <DropDownLinkItem text='Log out' icon={<MdOutlineLogout />} onClick={logOut} path={NavigationConst.Login} />
            </DropDown>
        </div>
    );
};

export default ProfileIcon;
