import { useAtom } from "jotai";
import { Authentication } from "../API/Authentication";
import HttpClient from "../API/HttpClient";
import { AppStateAtom } from "../State/AppState";

export const useLogout = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    const logout = async () => {
        if (appState.user) {
            const httpClient = new HttpClient({ baseURL: appState.api.baseUrl, withCredentials: true });
            await Authentication.logout(httpClient);
        }

        setAppState({
            ...appState,
            api: { ...appState.api, accessToken: null },
            user: null,
        });
    };

    return logout;
};
