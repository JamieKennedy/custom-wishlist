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
import { useAuthentication } from "../../Hooks/useAuthentication";
import { useLogout } from "../../Hooks/useLogout";
import { AppStateAtom } from "../../State/AppState";
import { getPayload } from "../../Utils/Authentication";

const Profile: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);
    const [pageState, setPageState] = useState<PageState>(PageState.Loading);

    const callApi = useApi();
    const getAccessToken = useAuthentication();
    const logout = useLogout();

    const { userId } = useParams();

    let isMounted = false;

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = await getAccessToken();

            if (isErrorResponse(accessToken)) {
                setPageState(PageState.AuthError);
                return;
            }

            const payLoad = getPayload(accessToken);
            const response = await callApi(getUser, true, payLoad.Id);

            if (!isErrorResponse(response)) {
                setAppState({ ...appState, user: response });
                setPageState(PageState.Loaded);
                return;
            }

            setPageState(PageState.AuthError);
        };

        if (!isMounted) {
            isMounted = true;
            fetchUser();
        }
    }, []);

    if (pageState === PageState.AuthError) {
        logout();
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
