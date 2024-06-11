import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <h1>Home Page</h1>
            }
        ],

    },
    {
        path: '/login',
        element: <Login />
    },
])
