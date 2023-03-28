import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import HttpClient from "../API/HttpClient";
import NavigationConst from "../Constants/NavigationConst";
import { IToken } from "../Data/Types/API/Authentication";
import { useAuthentication } from "../Hooks/useAuthentication";
import { useLogout } from "../Hooks/useLogout";
import { AppStateAtom } from "../State/AppState";
import { accessTokenExpired } from "../Utils/Authentication";

interface IAuthenticateProps {
    children: ReactNode;
}

enum AuthState {
    Success,
    Failed,
    Loading,
}

const Authenticate = () => {
    const [authState, setAuthState] = useState<AuthState>(AuthState.Success);
    const [appState] = useAtom(AppStateAtom);

    const getAccessToken = useAuthentication();
    const logout = useLogout();

    let didMount = false;

    useEffect(() => {
        const refreshAccessToken = async (): Promise<void> => {
            const accessToken = await getAccessToken();
            if (isErrorResponse(accessToken)) {
                setAuthState(AuthState.Failed);
                return;
            }
            setAuthState(AuthState.Success);
        };
        if (appState.api.accessToken && !accessTokenExpired(appState.api.accessToken)) {
            // Has non expired access token in state
            setAuthState(AuthState.Success);
            return;
        }
        if (!didMount) {
            didMount = true;
            refreshAccessToken();
        }
    }, [authState]);

    if (authState == AuthState.Loading) {
        return <p className='text-white'>Loading...</p>;
    }

    if (authState == AuthState.Failed) {
        logout();
        return <Navigate to={NavigationConst.Login} />;
    }

    return <Outlet />;
};

export default Authenticate;
