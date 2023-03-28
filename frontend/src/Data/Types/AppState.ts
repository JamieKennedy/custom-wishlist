import { IToken } from "./API/Authentication";
import { IUser } from "./API/User";

export interface IAppState {
    api: {
        baseUrl: string;
        accessToken?: null | string;
    };
    user: null | IUser;
}
