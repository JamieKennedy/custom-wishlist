import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppState } from "./State/AppState";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AppState>
            <App />
        </AppState>
    </React.StrictMode>
);
