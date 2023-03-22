import axios, { AxiosRequestConfig } from "axios";
import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import HttpClient from "../API/HttpClient";
import { AppStateAtom } from "../State/AppState";
import { accessTokenExpired } from "../Utils/Authentication";
import { useAuthentication } from "./useAuthentication";
import { useRefresh } from "./useRefresh";

type fn = <T>(...args: any[]) => Promise<T | IErrorResponse>;

export const useApi = () => {
    const [appState] = useAtom(AppStateAtom);
    const getClient = useAuthentication();

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
            };
        }

        // Initialise the request config
        let requestConfig: AxiosRequestConfig = { baseURL: appState.api.baseUrl };

        if (requiresAuth) {
            const response = await getClient();

            if (isErrorResponse(response)) {
                return response;
            }

            requestConfig = { ...requestConfig, headers: { ...requestConfig.headers, Authorization: `Bearer ${response}` } };
        }

        const httpClient = new HttpClient(requestConfig);

        if (data) {
            return await fn(httpClient, data);
        }

        return await fn(httpClient);
    };

    return callApi;
};
