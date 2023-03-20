import React, { createContext, useContext } from "react";

import HttpClient from "../API/HttpClient";

interface HttpClientProviderProps {
    children: React.ReactNode;
    baseURL: string;
}

const HttpClientContext = createContext<HttpClient | null>(null);

export function HttpClientProvider({ children, baseURL }: HttpClientProviderProps) {
    const httpClient = new HttpClient({ baseURL: baseURL });

    return <HttpClientContext.Provider value={httpClient}>{children}</HttpClientContext.Provider>;
}

export function useHttpClient() {
    const httpClient = useContext(HttpClientContext);

    if (!httpClient) {
        throw new Error("useHttpClient must be used within a HttpClientProvider");
    }

    return httpClient;
}
