import { IToken } from "./Authentication";

export interface IUser {
    id: string;
    userName: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    token: IToken;
}
