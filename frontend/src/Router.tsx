import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";

// main app router
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);
