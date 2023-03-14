import LoginForm from "./Components/LoginForm";

const Login = (): JSX.Element => {
    return (
        <div className='flex w-full'>
            <div className='m-auto h-fit w-[35rem] rounded-3xl bg-white bg-opacity-5 backdrop-blur-md'>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
