import { AxiosRequestConfig } from "axios";

export namespace HttpClientUtils {
    export const BuildHttpClientConfig = (baseUrl: string, accessToken?: string, timeout?: number) => {
        return {
            baseURL: baseUrl,
            timeout: timeout ? timeout : 30000, // Milliseconds
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : null,
            },
        } as AxiosRequestConfig;
    };
}
