import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import SignUp from "../pages/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../components/Dashboard/Pages/Profile";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import AllSessions from "../pages/AllSessions/AllSessions";
import SessionDetails from "../pages/SessionDetails/SessionDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/all-sessions',
                element: <AllSessions />,
            },
            {
                path: '/session/:id',
                element: <PrivateRoute><SessionDetails /></PrivateRoute>
            }
        ],
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <SignUp />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Profile />
            }
        ]
    }
])
