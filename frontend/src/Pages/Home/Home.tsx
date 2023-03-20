import { FunctionComponent, useTransition } from "react";
import { getPayload, isLoggedIn } from "../../Utils/Authentication";

import { useAtom } from "jotai";
import { Navigate } from "react-router";
import HttpClient from "../../API/HttpClient";
import NavigationConst from "../../Constants/NavigationConst";
import { IUser } from "../../Data/Types/API/User";
import { useHttpClient } from "../../Providers/HttpClientProvider";
import { AppStateAtom } from "../../State/AppState";

const Home: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    // user is not logged in, so navigate to login page
    if (!isLoggedIn(appState)) {
        return <Navigate to={NavigationConst.Login} />;
    }

    return (
        <div>
            <p className='text-white'>Home</p>
        </div>
    );
};

export default Home;
