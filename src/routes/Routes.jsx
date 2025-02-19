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
import StudentRoute from "./StudentRoute";
import ViewBookedSessions from "../pages/ViewBookedSession/ViewBookedSessions";
import DetailsBookedSession from "../pages/DetailsBookedSession/DetailsBookedSession";
import CreateNotes from "../pages/Notes/CreateNotes";
import ManageNotes from "../pages/Notes/ManageNotes";
import ViewNote from "../pages/Notes/ViewNote";
import EditNote from "../pages/Notes/EditNote";
import TutorRoute from "./TutorRoute";
import CreateSession from "../pages/CreateSession/CreateSession";
import ManageSessions from "../pages/CreateSession/ManageSessions";
import EditSession from "../pages/SessionDetails/EditSession";
import SessionDetailsDashboard from "../pages/SessionDetails/SessionDetailsDashboard";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Admin/AllUsers";

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
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                // student routes
                path: 'View-booked-session',
                element: <PrivateRoute>
                    <StudentRoute>
                        <ViewBookedSessions />
                    </StudentRoute>
                </PrivateRoute>
            },
            {
                // student routes
                path: '/dashboard/view-booked-session/:id',
                element: <PrivateRoute>
                    <StudentRoute>
                        <DetailsBookedSession />
                    </StudentRoute>
                </PrivateRoute>
            },
            {
                // student routes
                path: 'create-note',
                element: <PrivateRoute>
                    <StudentRoute>
                        <CreateNotes />
                    </StudentRoute>
                </PrivateRoute>
            },
            {
                // student routes
                path: 'manage-personal-notes',
                element: <PrivateRoute>
                    <StudentRoute>
                        <ManageNotes />
                    </StudentRoute>
                </PrivateRoute>
            },
            {
                // student routes
                path: 'study-materials',
                element: <PrivateRoute>
                    <StudentRoute>
                        <h3>Study Materials</h3>
                    </StudentRoute>
                </PrivateRoute>
            },
            {
                // student routes
                path: 'note/:id',
                element: <PrivateRoute>
                    <StudentRoute>
                        <ViewNote />
                    </StudentRoute>
                </PrivateRoute>
            },
            {
                // student routes
                path: 'note/edit/:id',
                element: <PrivateRoute>
                    <StudentRoute>
                        <EditNote />
                    </StudentRoute>
                </PrivateRoute>
            },
            {
                // tutor routes
                path: 'create-session',
                element: <PrivateRoute>
                    <TutorRoute>
                        <CreateSession />
                    </TutorRoute>
                </PrivateRoute>
            },
            {
                // tutor routes
                path: 'manage-sessions',
                element: <PrivateRoute>
                    <TutorRoute>
                        <ManageSessions />
                    </TutorRoute>
                </PrivateRoute>
            },
            {
                // tutor routes
                path: 'session/edit/:id',
                element: <PrivateRoute>
                    <TutorRoute>
                        <EditSession />
                    </TutorRoute>
                </PrivateRoute>
            },
            {
                // tutor routes
                path: 'session/:email/:id',
                element: <PrivateRoute>
                    <TutorRoute>
                        <SessionDetailsDashboard />
                    </TutorRoute>
                </PrivateRoute>
            },
            {
                // tutor routes
                path: 'upload-materials',
                element: <PrivateRoute>
                    <TutorRoute>
                        <h3>Upload Materials</h3>
                    </TutorRoute>
                </PrivateRoute>
            },
            {
                // tutor routes
                path: 'view-all-materials',
                element: <PrivateRoute>
                    <TutorRoute>
                        <h3>View all materials</h3>
                    </TutorRoute>
                </PrivateRoute>
            },
            {
                // admin routes
                path: '/dashboard/all-users',
                element: <PrivateRoute>
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                // admin routes
                path: '/dashboard/all-sessions',
                element: <PrivateRoute>
                    <AdminRoute>
                        <AllSessions />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                // admin routes
                path: '/dashboard/all-materials',
                element: <PrivateRoute>
                    <AdminRoute>
                        <h3>All Materials</h3>
                    </AdminRoute>
                </PrivateRoute>
            }
        ]
    }
])
