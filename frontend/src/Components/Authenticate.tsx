import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import { refresh } from "../API/Authentication";
import NavigationConst from "../Constants/NavigationConst";
import { IToken } from "../Data/Types/API/Authentication";
import { useHttpClient } from "../Providers/HttpClientProvider";
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
    const [authState, setAuthState] = useState<AuthState>(AuthState.Loading);
    const [appState, setAppState] = useAtom(AppStateAtom);

    const httpClient = useHttpClient();

    useEffect(() => {
        const refreshToken = async (refreshToken: string): Promise<void> => {
            const resposne = await refresh(refreshToken, httpClient);

            if (isErrorResponse(resposne)) {
                setAuthState(AuthState.Failed);
            }

            setAuthState(AuthState.Success);
        };

        if (appState.api.token && appState.api.token.accessToken && !accessTokenExpired(appState.api.token.accessToken)) {
            // Has non expired access token in state
            setAuthState(AuthState.Success);
            return;
        }

        if (appState.api.token && appState.api.token.refreshToken) {
            refreshToken(appState.api.token.refreshToken);
        }

        setAuthState(AuthState.Failed);
    }, [authState]);

    if (authState == AuthState.Loading) {
        return <p className='text-white'>Loading...</p>;
    }

    if (authState == AuthState.Failed) {
        return <Navigate to={NavigationConst.Login} />;
    }

    return <Outlet />;
};

export default Authenticate;
