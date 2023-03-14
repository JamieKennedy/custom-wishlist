import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/Login/Components/LoginForm";
import Login from "./Pages/Login/Login";

// main app router
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
