import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { Navigate } from "react-router";
import NavigationConst from "../../Constants/NavigationConst";
import { AppStateAtom } from "../../State/AppState";

const Home: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    // user is not logged in, so navigate to login page
    if (!appState.user) {
        return <Navigate to={NavigationConst.Login} />;
    }

    return (
        <div>
            <p>Home</p>
        </div>
    );
};

export default Home;
