export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ITokenRefreshRequest {
    refreshToken: string;
}

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    Id: string;
    Email: string;
    exp: number;
    iss: string;
    aud: string;
}
