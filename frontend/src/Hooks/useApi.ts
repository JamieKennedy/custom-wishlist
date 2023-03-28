import axios, { AxiosRequestConfig } from "axios";
import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import HttpClient from "../API/HttpClient";
import { AppStateAtom } from "../State/AppState";
import { accessTokenExpired } from "../Utils/Authentication";
import { HttpClientUtils } from "../Utils/HttpClientUtils";
import { useAuthentication } from "./useAuthentication";
import { useRefresh } from "./useRefresh";

type fn = <T>(...args: any[]) => Promise<T | IErrorResponse>;

export const useApi = () => {
    const [appState] = useAtom(AppStateAtom);
    const getAccessToken = useAuthentication();

    const callApi = async <T, V>(
        fn: (httpClient: HttpClient, ...args: any[]) => Promise<T | IErrorResponse>,
        requiresAuth: boolean = false,
        data?: V
    ): Promise<T | IErrorResponse> => {
        if (!appState.api.baseUrl) {
            // No base url in the state, shouldn't happen
            return {
                statusCode: 404,
                message: "No BaseUrl found",
            } as IErrorResponse;
        }

        let accessToken: string | undefined;

        if (requiresAuth) {
            const response = await getAccessToken();

            if (isErrorResponse(response)) {
                return response;
            }

            accessToken = response;
        }

        const requestConfig = HttpClientUtils.BuildHttpClientConfig(appState.api.baseUrl, accessToken);

        const httpClient = new HttpClient(requestConfig);

        if (data) {
            return await fn(httpClient, data);
        }

        return await fn(httpClient);
    };

    return callApi;
};
