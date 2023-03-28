import { FunctionComponent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import { useAtom } from "jotai";
import { SpinnerCircular } from "spinners-react";
import { getUser } from "../../API/User";
import Header from "../../Components/PageElements/Header";
import NavigationConst from "../../Constants/NavigationConst";
import { isErrorResponse } from "../../Data/Types/API/ErrorResponse";
import { PageState } from "../../Data/Types/PageState";
import { useApi } from "../../Hooks/useApi";
import { AppStateAtom } from "../../State/AppState";

const Profile: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);
    const [pageState, setPageState] = useState<PageState>(PageState.Loading);

    const callApi = useApi();

    const { userId } = useParams();

    useEffect(() => {
        if (!appState.api.token || !appState.api.token.accessToken) {
            setPageState(PageState.AuthError);
            return;
        }

        const fetchUser = async () => {
            const response = await callApi(getUser, true, userId);

            if (!isErrorResponse(response)) {
                setAppState({ ...appState, user: response });
                setPageState(PageState.Loaded);
                return;
            }

            setPageState(PageState.AuthError);
            return;
        };

        fetchUser();
    }, []);

    if (pageState === PageState.AuthError) {
        return <Navigate to={NavigationConst.Login} />;
    }

    if (pageState === PageState.Loading) {
        return <SpinnerCircular color='#ffffff' secondaryColor='#747a7a' thickness={300} size={64} style={{ margin: "auto" }} />;
    }

    return (
        <>
            <Header />
            <div className='m-auto mb-16 h-[100rem] w-11/12 max-w-screen-2xl rounded-3xl bg-white bg-opacity-5 p-10 backdrop-blur-md'>
                <h1 className='text-4xl text-white'>Profile</h1>
            </div>
        </>
    );
};

export default Profile;
