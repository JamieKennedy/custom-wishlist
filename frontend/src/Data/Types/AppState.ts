import { IToken } from "./API/Authentication";
import { IUser } from "./API/User";

export interface IAppState {
    api: {
        baseUrl: string;
        token?: null | IToken;
    };
    user: null | IUser;
}
