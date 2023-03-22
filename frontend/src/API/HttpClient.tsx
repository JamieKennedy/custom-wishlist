import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { IErrorResponse } from "../Data/Types/API/ErrorResponse";
import { accessTokenExpired } from "../Utils/Authentication";

class HttpClient {
    private axiosInstance: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {
        this.axiosInstance = axios.create(config);
        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T | IErrorResponse> {
        try {
            const response = await this.axiosInstance.get<T>(url, config);
            return response.data;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    public async post<T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T | IErrorResponse> {
        try {
            const response = await this.axiosInstance.post<T>(url, data, config);
            return response.data;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T | IErrorResponse> {
        try {
            const response = await this.axiosInstance.put<T>(url, data, config);
            return response.data;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T | IErrorResponse> {
        try {
            const response = await this.axiosInstance.delete<T>(url, config);
            return response.data;
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    private handleError = (error: any): IErrorResponse => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server has responded
                if (error.response.status === 401) {
                    // 401 Unauthorised
                    return {
                        statusCode: error.response.status,
                        message: error.message,
                    };
                }

                if (error.response.status === 400 || error.response.status === 500) {
                    const errorResponse = error.response.data as IErrorResponse;
                    return errorResponse;
                } else {
                    // Shouldn't really happen, passing null as status code so it can be checked
                    // in consumer
                    return {
                        statusCode: null,
                        message: error.message,
                    };
                }
            }
        }

        if (error.message) {
            // Error isn't an axios errror or server response
            // but has a message
            return {
                statusCode: null,
                message: error.message,
            };
        }

        // Error has no error message
        return {
            statusCode: null,
            message: "An error has occured",
        };
    };

    private onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        return config;
    };

    private onRequestError = (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    };

    private onResponse = (config: AxiosResponse): AxiosResponse => {
        return config;
    };

    private onResponseError = (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    };

    private _initializeRequestInterceptor = () => {
        this.axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    };

    private _initializeResponseInterceptor = () => {
        this.axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);
    };
}

export default HttpClient;
