import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import { Authentication } from "../API/Authentication";
import HttpClient from "../API/HttpClient";
import { AppStateAtom } from "../State/AppState";
import { accessTokenExpired } from "../Utils/Authentication";

export const useAuthentication = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    const getAccessToken = async (): Promise<string | IErrorResponse> => {
        if (!appState.api.accessToken || accessTokenExpired(appState.api.accessToken)) {
            const httpClient = new HttpClient({ baseURL: appState.api.baseUrl, withCredentials: true });
            const response = await Authentication.refresh(httpClient);

            if (isErrorResponse(response)) {
                return response;
            }

            setAppState({ ...appState, api: { ...appState.api, accessToken: response } });
            return response;
        }

        return appState.api.accessToken;
    };

    return getAccessToken;
};
