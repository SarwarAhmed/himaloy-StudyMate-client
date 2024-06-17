import { NavLink } from "react-router-dom";

const StudentMenu = () => {
    return (
        <>
            <li className="hover:underline">
                <NavLink to="/dashboard/view-booked-session"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    View Booked Session
                </NavLink>
            </li>
            <li className="hover:underline">
                <NavLink to="/dashboard/create-note"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    Create Note
                </NavLink>
            </li>
            <li className="hover:underline">
                <NavLink to="/dashboard/manage-personal-notes"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    Manage Persoan Notes
                </NavLink>
            </li>
            <li className="hover:underline">
                <NavLink to="/dashboard/study-materials"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    Study Materials
                </NavLink>
            </li>
        </>
    );
};

export default StudentMenu;
