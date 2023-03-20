import { ILoginRequest, IToken } from "../Data/Types/API/Authentication";

import { IErrorResponse } from "../Data/Types/API/ErrorResponse";
import HttpClient from "./HttpClient";

export const login = async (loginRequest: ILoginRequest, httpClient: HttpClient): Promise<IToken | IErrorResponse> => {
    return await httpClient.post<IToken, ILoginRequest>("/Authentication/login", loginRequest);
};
