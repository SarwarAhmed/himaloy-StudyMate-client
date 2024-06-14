import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types';

const StudentRoute = ({ children }) => {
    const [role, isLoading] = useRole();

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (role === 'student') return children;

    return <Navigate to='/dashboard' />
};

export default StudentRoute;

StudentRoute.propTypes = {
    children: PropTypes.element,
};
