import { IToken, ITokenRefreshRequest } from "../Data/Types/API/Authentication";
import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import { refresh } from "../API/Authentication";
import HttpClient from "../API/HttpClient";
import { AppStateAtom } from "../State/AppState";

export const useRefresh = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    const refreshAccessToken = async (): Promise<IToken | IErrorResponse> => {
        if (appState.api.token && appState.api.token.refreshToken) {
            const data: ITokenRefreshRequest = { refreshToken: appState.api.token.refreshToken };

            const httpClient = new HttpClient({ baseURL: appState.api.baseUrl });
            const response = await refresh(httpClient, data);

            if (!isErrorResponse(response)) {
                // Update the app state
                setAppState({ ...appState, api: { ...appState.api, token: response } });
            }

            return response;
        }

        return {
            statusCode: 401,
            message: "No token found",
        };
    };

    return refreshAccessToken;
};
