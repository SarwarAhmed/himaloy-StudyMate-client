import { Link } from "react-router-dom";

const TutorMenu = () => {
    return (
        <>
            <li className="hover:underline">
                <Link href="/">
                    Create Session
                </Link>
            </li>
            <li className="hover:underline">
                <Link href="/">
                    View All Sessions
                </Link>
            </li>
            <li className="hover:underline">
                <Link href="/">
                    Upload Materials
                </Link>
            </li>
            <li className="hover:underline">
                <Link href="/">
                    View All Materials
                </Link>
            </li>
        </>
    );
};

export default TutorMenu;
