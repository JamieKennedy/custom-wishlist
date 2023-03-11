import { createContext, ReactNode, useContext, useState } from "react";
import { IAppContext, IAppState } from "../Data/Types/AppState";

interface IAppStateProps {
    children: ReactNode;
}

// Default app state
const initialAppState: IAppState = {};

export const AppContext = createContext<IAppContext | null>(null);

export const AppState = ({ children }: IAppStateProps): JSX.Element => {
    const [appState, setAppState] = useState<IAppState>(initialAppState);

    const updateAppState = (newState: IAppState): void => {
        setAppState(newState);
    };

    return (
        <AppContext.Provider value={[appState, updateAppState]}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => useContext(AppContext);
