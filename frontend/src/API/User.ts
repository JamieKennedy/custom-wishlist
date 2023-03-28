import { IErrorResponse } from "../Data/Types/API/ErrorResponse";
import { IUser } from "../Data/Types/API/User";
import HttpClient from "./HttpClient";

export const getUser = async (httpClient: HttpClient, id: string): Promise<IUser | IErrorResponse> => {
    return await httpClient.get(`/User/${id}`);
};
