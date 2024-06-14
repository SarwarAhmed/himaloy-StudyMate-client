import { Link } from "react-router-dom";

const StudentMenu = () => {
    return (
        <>
            <li className="hover:underline">
                <Link href="/">
                    View Booked Session
                </Link>
            </li>
            <li className="hover:underline">
                <Link href="/">
                    Create Note
                </Link>
            </li>
            <li className="hover:underline">
                <Link href="/">
                    Manage Persoan Notes
                </Link>
            </li>
            <li className="hover:underline">
                <Link href="/">
                    Study Matetials
                </Link>
            </li>
        </>
    );
};

export default StudentMenu;
