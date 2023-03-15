import { useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../../Components/UI/FormErrorMessage";
import FormSubmitButton from "../../../Components/UI/FormSubmitButton";
import { FormState } from "../../../Data/Types/FormState";

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

    const onSubmit = async (data: ILoginFormData) => {
        setFormState(FormState.pending);

        // TODO: Implement login api call.

        setFormState(FormState.default);
    };

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
                    <input
                        id='password'
                        {...register("password", { required: "Password is required" })}
                        className='my-3 h-8 w-full rounded-md bg-slate-900 px-5 text-white'
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password && errors.password.message && <FormErrorMessage message={errors.password.message} />}
                </div>

                <div>
                    <FormSubmitButton defaultStateText='Log In' formState={formState} />
                    <p className='cursor-pointer text-center text-white'>
                        <a className='underline'>Create an account</a> | <a className='underline'>Forgotten password</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
