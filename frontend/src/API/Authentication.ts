import { ILoginRequest, IToken, ITokenRefreshRequest } from "../Data/Types/API/Authentication";

import { IErrorResponse } from "../Data/Types/API/ErrorResponse";
import HttpClient from "./HttpClient";

export const login = async (httpClient: HttpClient, loginRequest: ILoginRequest): Promise<IToken | IErrorResponse> => {
    return await httpClient.post<IToken, ILoginRequest>("/Authentication/login", loginRequest);
};

export const refresh = async (httpClient: HttpClient, data: ITokenRefreshRequest): Promise<IToken | IErrorResponse> => {
    return await httpClient.post<IToken, ITokenRefreshRequest>("/Token/Refresh", data);
};
