import { atom } from "jotai";
import { IAppState } from "../Data/Types/AppState";

// Default app state
const initialAppState: IAppState = {
    api: {
        baseUrl: "http://localhost:28593/api/",
    },
};

export const AppStateAtom = atom<IAppState>(initialAppState);
