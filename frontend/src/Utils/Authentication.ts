import jwt_decode from "jwt-decode";
import { ITokenPayload } from "../Data/Types/API/Authentication";
import { IAppState } from "../Data/Types/AppState";

export const getPayload = (token: string): ITokenPayload => {
    var decoded = jwt_decode<ITokenPayload>(token);

    return decoded;
};

export const accessTokenExpired = (token: string): boolean => {
    const payload = getPayload(token);

    return !(Date.now() / 1000 < payload.exp);
};

export const isLoggedIn = (appState: IAppState): boolean => {
    if (!appState.api.token) {
        // TODO: integrate with cookies and check for token there

        return false;
    }

    return true;
};
