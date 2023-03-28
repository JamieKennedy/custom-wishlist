import { createBrowserRouter } from "react-router-dom";
import Authenticate from "./Components/Authenticate";
import NavigationConst from "./Constants/NavigationConst";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import Home from "./Pages/Home/Home";
import LoginForm from "./Pages/Login/Components/LoginForm";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";

// main app router
export const router = createBrowserRouter([
    {
        path: NavigationConst.Home,
        element: <Authenticate />,
        children: [
            {
                path: NavigationConst.Home,
                element: <Home />,
            },
            {
                path: NavigationConst.Profile + ":userId",
                element: <Profile />,
            },
        ],
    },
    {
        path: NavigationConst.Login,
        element: <Login />,
    },
    {
        path: NavigationConst.CreateAccount,
        element: <CreateAccount />,
    },
]);
