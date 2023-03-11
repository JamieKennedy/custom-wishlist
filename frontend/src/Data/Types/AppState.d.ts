export interface IAppState {}

export type IAppContext =
    | [appState: IAppState, updateAppState: (newState: IAppState) => void];
