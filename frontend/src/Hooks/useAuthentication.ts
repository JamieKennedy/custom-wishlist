import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import { AppStateAtom } from "../State/AppState";
import { accessTokenExpired } from "../Utils/Authentication";
import { useRefresh } from "./useRefresh";

export const useAuthentication = () => {
    const [appState] = useAtom(AppStateAtom);

    const refreshAccessToken = useRefresh();

    const getClient = async (): Promise<string | IErrorResponse> => {
        if (appState.api.token && appState.api.token.accessToken) {
            if (accessTokenExpired(appState.api.token.accessToken)) {
                const response = await refreshAccessToken();

                if (isErrorResponse(response)) {
                    return response;
                }

                return response.accessToken;
            }

            return appState.api.token.accessToken;
        }

        return {
            statusCode: 404,
            message: "No access token found",
        };
    };

    return getClient;
};
