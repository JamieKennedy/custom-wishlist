import { ILoginRequest, IToken, ITokenRefreshRequest } from "../Data/Types/API/Authentication";
import { IErrorResponse, isErrorResponse } from "../Data/Types/API/ErrorResponse";

import HttpClient from "./HttpClient";

export namespace Authentication {
    export const login = async (httpClient: HttpClient, loginRequest: ILoginRequest): Promise<string | IErrorResponse> => {
        return await httpClient.post<string, ILoginRequest>("/Authentication/login", loginRequest);
    };

    export const refresh = async (httpClient: HttpClient): Promise<string | IErrorResponse> => {
        return await httpClient.post<string, ITokenRefreshRequest>("/Token/Refresh");
    };

    export const logout = async (HttpClient: HttpClient): Promise<void | IErrorResponse> => {
        return await HttpClient.post<void, null>("/Authentication/logout");
    };
}
