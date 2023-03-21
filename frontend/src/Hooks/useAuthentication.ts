import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { AxiosRequestConfig } from "axios";
import { useAtom } from "jotai";
import HttpClient from "../API/HttpClient";
import { useHttpClient } from "../Providers/HttpClientProvider";
import { AppStateAtom } from "../State/AppState";
import { accessTokenExpired } from "../Utils/Authentication";
import { useRefresh } from "./useRefresh";

export const useAuthentication = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);
    const httpClient = useHttpClient();

    const refreshAccessToken = useRefresh();

    const getClient = async (): Promise<HttpClient | IErrorResponse> => {
        if (appState.api.token && appState.api.token.accessToken) {
            if (accessTokenExpired(appState.api.token.accessToken)) {
                const response = await refreshAccessToken();

                if (isErrorResponse(response)) {
                    return response;
                }

                httpClient.addBearerToken(response.accessToken);
                return httpClient;
            }

            httpClient.addBearerToken(appState.api.token.accessToken);
            return httpClient;
        }

        return {
            statusCode: 401,
            message: "No access token found",
        };
    };

    return getClient;
};
