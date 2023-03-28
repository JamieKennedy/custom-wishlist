export interface IErrorResponse {
    StatusCode: number | null;
    Message: string;
}

// Type narrowing function to evaluate if a response
// is an error response
export const isErrorResponse = (response: IErrorResponse | any): response is IErrorResponse => {
    // response type only has two properties: statusCode and message
    return Object.keys(response).length === 2 && (response as IErrorResponse).StatusCode !== undefined && (response as IErrorResponse).Message !== undefined;
};
