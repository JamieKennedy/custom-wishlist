import { InternalAxiosRequestConfig } from "axios";

export const hasBearerToken = (config: InternalAxiosRequestConfig): boolean => {
    if (
        config.headers.Authorization &&
        config.headers.Authorization.toString().includes("Bearer") &&
        config.headers.Authorization.toString().split(" ").length == 2
    ) {
        return true;
    }

    return false;
};

export const getBearerToken = (config: InternalAxiosRequestConfig): string | null => {
    if (hasBearerToken(config)) {
        return config.headers!.Authorization!.toString().split(" ")[1];
    }

    return null;
};
