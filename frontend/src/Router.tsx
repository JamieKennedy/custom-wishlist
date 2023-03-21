import { createBrowserRouter } from "react-router-dom";
import Authenticate from "./Components/Authenticate";
import NavigationConst from "./Constants/NavigationConst";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/Login/Components/LoginForm";
import Login from "./Pages/Login/Login";

// main app router
export const router = createBrowserRouter([
    {
        path: NavigationConst.Home,
        element: <Authenticate />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: NavigationConst.Login,
        element: <Login />,
    },
]);
