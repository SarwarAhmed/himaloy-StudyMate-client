import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
            <li className="hover:underline">
                <Link to="/dashboard/all-users">
                    All Users
                </Link>
            </li>
            <li className="hover:underline">
                <Link to="/dashboard/all-sessions">
                    All Sessions
                </Link>
            </li>
            <li className="hover:underline">
                <Link to="/dashboard/all-materials">
                    All Materials
                </Link>
            </li>
        </>
    );
};

export default AdminMenu;
