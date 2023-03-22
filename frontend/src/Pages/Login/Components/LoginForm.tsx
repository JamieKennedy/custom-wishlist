import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router";
import { ILoginRequest, IToken } from "../../../Data/Types/API/Authentication";
import { IErrorResponse, isErrorResponse } from "../../../Data/Types/API/ErrorResponse";
import { getPayload, isLoggedIn } from "../../../Utils/Authentication";

import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../../API/Authentication";
import FormErrorMessage from "../../../Components/UI/FormErrorMessage";
import FormSubmitButton from "../../../Components/UI/FormSubmitButton";
import NavigationConst from "../../../Constants/NavigationConst";
import { FormState } from "../../../Data/Types/FormState";
import { useApi } from "../../../Hooks/useApi";
import { AppStateAtom } from "../../../State/AppState";

interface ILoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ILoginFormData>();

    const [formState, setFormState] = useState<FormState>(FormState.default);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [appState, setAppState] = useAtom(AppStateAtom);
    const navigate = useNavigate();
    const callApi = useApi();

    const onSubmit = async (data: ILoginFormData) => {
        setFormState(FormState.pending);

        const response = await callApi(login, false, {
            email: data.email,
            password: data.password,
        });

        if (isErrorResponse(response)) {
            // Default to an error occured message
            let errorMessage = "An error has occured, please try again";

            if (response.statusCode && response.statusCode === 401) {
                // if reponse is unauthorised, change error message to
                // incorrect details
                errorMessage = "Incorrect details";
            }

            setLoginError(errorMessage);
            setFormState(FormState.default);
            return;
        }

        appState.api.token = response as IToken;
        setAppState(appState);
        setFormState(FormState.default);

        navigate(NavigationConst.Home);
    };

    if (isLoggedIn(appState)) {
        // User is logged in so navigate to home
        return <Navigate to={NavigationConst.Home} />;
    }

    return (
        <div className='flex h-[30rem] w-full flex-col items-center py-10'>
            <h1 className='text-center text-4xl text-white'>Log In</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='h-1/2 w-3/4'>
                <div className='my-5 h-24 w-full'>
                    <label htmlFor='email' className='text-lg text-white'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        {...register("email", { required: "Email is required", pattern: { value: /[\@]/g, message: "Invalid Email" } })}
                        className='my-3 h-8 w-full rounded-md bg-slate-900 px-5 text-white'
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && errors.email.message && <FormErrorMessage message={errors.email.message} />}
                </div>
                <div className='mt-5 mb-10 h-24 w-full'>
                    <label htmlFor='password' className='text-lg text-white'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            id='password'
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required" })}
                            className='my-3 h-8 w-full rounded-md bg-slate-900 pr-12 pl-5 text-white'
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {showPassword ? (
                            <FaEyeSlash
                                className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-white hover:text-gray-300 '
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FaEye
                                className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-white hover:text-gray-300'
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    {errors.password && errors.password.message && <FormErrorMessage message={errors.password.message} />}
                </div>

                <div className='flex h-24 flex-col justify-between'>
                    <FormSubmitButton defaultStateText='Log In' formState={formState} />
                    {loginError && (
                        <div className='flex justify-center'>
                            <FormErrorMessage message={loginError} />
                        </div>
                    )}
                    <p className='cursor-pointer text-center text-white'>
                        <a className='hover:underline'>Create an account</a> | <a className='hover:underline'>Forgotten password</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
