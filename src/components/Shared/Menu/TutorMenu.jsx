import { NavLink } from "react-router-dom";

const TutorMenu = () => {
    return (
        <>
            <li className="hover:underline">
                <NavLink to="/dashboard/create-session"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    Create Session
                </NavLink>
            </li>
            <li className="hover:underline">
                <NavLink to="/dashboard/view-all-sessions"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    View All Sessions
                </NavLink>
            </li>
            <li className="hover:underline">
                <NavLink to="/dashboard/upload-materials"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    Upload Materials
                </NavLink>
            </li>
            <li className="hover:underline">
                <NavLink to="/dashboard/view-all-materials"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                            : "px-4 py-2 rounded-md"
                    }
                >
                    View All Materials
                </NavLink>
            </li>
        </>
    );
};

export default TutorMenu;
