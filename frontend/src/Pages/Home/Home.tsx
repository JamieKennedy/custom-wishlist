import { Navigate, redirect } from "react-router";

import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { AppStateAtom } from "../../State/AppState";
import LoginForm from "../Login/Components/LoginForm";

const Home: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    // user is not logged in, so navigate to login page
    if (!appState.user) {
        return <Navigate to='/login' />;
    }

    return (
        <div>
            <p>Home</p>
        </div>
    );
};

export default Home;
