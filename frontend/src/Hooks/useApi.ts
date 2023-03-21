import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import HttpClient from "../API/HttpClient";
import { useHttpClient } from "../Providers/HttpClientProvider";
import { AppStateAtom } from "../State/AppState";
import { accessTokenExpired } from "../Utils/Authentication";
import { useAuthentication } from "./useAuthentication";
import { useRefresh } from "./useRefresh";

type fn = <T>(...args: any[]) => Promise<T | IErrorResponse>;

export const useApi = () => {
    const [appState, useAppState] = useAtom(AppStateAtom);
    let httpClient = useHttpClient();
    const getClient = useAuthentication();

    const callApi = async <T, V>(
        fn: (httpClient: HttpClient, data?: V) => Promise<T | IErrorResponse>,
        requiresAuth: boolean = false,
        data?: V
    ): Promise<T | IErrorResponse> => {
        if (requiresAuth) {
            const response = await getClient();

            if (isErrorResponse(response)) {
                return response;
            }

            httpClient = response;
        }

        return await fn(httpClient, data);
    };

    return callApi;
};
