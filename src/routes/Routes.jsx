import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <h1>Home Page</h1>
            }
        ]
    }
])
