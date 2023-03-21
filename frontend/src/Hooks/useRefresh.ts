import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import { useAtom } from "jotai";
import { refresh } from "../API/Authentication";
import { IToken } from "../Data/Types/API/Authentication";
import { IAppState } from "../Data/Types/AppState";
import { useHttpClient } from "../Providers/HttpClientProvider";
import { AppStateAtom } from "../State/AppState";

export const useRefresh = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);
    const client = useHttpClient();

    const refreshAccessToken = async (): Promise<IToken | IErrorResponse> => {
        if (appState.api.token && appState.api.token.refreshToken) {
            const response = await refresh(appState.api.token.refreshToken, client);

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
