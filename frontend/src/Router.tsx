import { createBrowserRouter } from "react-router-dom";
import NavigationConst from "./Constants/NavigationConst";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/Login/Components/LoginForm";
import Login from "./Pages/Login/Login";

// main app router
export const router = createBrowserRouter([
    {
        path: NavigationConst.Home,
        element: <Home />,
    },
    {
        path: NavigationConst.Login,
        element: <Login />,
    },
]);
