import { FunctionComponent, useEffect, useState } from "react";

import { useAtom } from "jotai";
import { Navigate } from "react-router";
import { SpinnerCircular } from "spinners-react";
import { getUser } from "../../API/User";
import Header from "../../Components/PageElements/Header";
import NavigationConst from "../../Constants/NavigationConst";
import { isErrorResponse } from "../../Data/Types/API/ErrorResponse";
import { PageState } from "../../Data/Types/PageState";
import { useApi } from "../../Hooks/useApi";
import { useAuthentication } from "../../Hooks/useAuthentication";
import { AppStateAtom } from "../../State/AppState";
import { getPayload } from "../../Utils/Authentication";

const Home: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);
    const [pageState, setPageState] = useState<PageState>(PageState.Loading);

    const callApi = useApi();
    const getAccessToken = useAuthentication();

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
    }, [pageState]);

    if (pageState === PageState.AuthError) {
        return <Navigate to={NavigationConst.Login} />;
    }

    if (pageState === PageState.Loading) {
        return (
            <>
                <Header />
                <div className='m-auto mb-16 h-[100rem] w-11/12 max-w-screen-2xl rounded-3xl bg-white bg-opacity-5 backdrop-blur-md'>
                    <SpinnerCircular color='#ffffff' secondaryColor='#747a7a' thickness={300} size={64} style={{ margin: "auto" }} />
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className='m-auto mb-16 h-[100rem] w-11/12 max-w-screen-2xl rounded-3xl bg-white bg-opacity-5 backdrop-blur-md'></div>
        </>
    );
};

export default Home;
