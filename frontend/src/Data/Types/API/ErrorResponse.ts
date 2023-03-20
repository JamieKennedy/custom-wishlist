export interface IErrorResponse {
    statusCode: number | null;
    message: string;
}

// Type narrowing function to evaluate if a response
// is an error response
export const isErrorResponse = (response: IErrorResponse | any): response is IErrorResponse => {
    // response type only has two properties: statusCode and message
    return Object.keys(response).length === 2 && (response as IErrorResponse).statusCode !== undefined && (response as IErrorResponse).message !== undefined;
};
