import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { AppStateAtom } from "../../State/AppState";

const Home: FunctionComponent = () => {
    const [appState, setAppState] = useAtom(AppStateAtom);

    return (
        <div>
            <p className='text-white'>Home</p>
        </div>
    );
};

export default Home;
