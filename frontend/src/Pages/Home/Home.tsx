import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { useApi } from "../../Hooks/useApi";
import { AppStateAtom } from "../../State/AppState";

const Home: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    const callApi = useApi();

    return (
        <div>
            <p className='text-white'>Home</p>
        </div>
    );
};

export default Home;
