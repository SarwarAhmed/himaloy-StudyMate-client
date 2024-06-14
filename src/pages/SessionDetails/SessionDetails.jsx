import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";

const SessionDetails = () => {
    const [role, isLoading] = useRole();
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();


    const {
        data: session = {},
        isLoading: isLoading2,
    } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/session/${id}`);

            return data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isLoading2) {
        return <LoadingSpinner />
    }


    return (
        <div>
            <Helmet>
                <title>StudyMate || {session.title}</title>
            </Helmet>
            <div className="container mx-auto px-5 mt-10">
                <div className="bg-cyan-50 rounded-lg shadow-md p-4 mb-4">
                    <h2 className="text-lg font-bold mb-2">{session.title}</h2>
                    <p className="text-gray-600 mb-2">{session.description}</p>
                    <p className="text-gray-600 mb-2">Tutor: {session.tutorName}</p>
                    <p className="text-gray-600 mb-2">Average rating: {session.rating}</p>
                    <p className="text-gray-600 mb-2">Registration start date: {session.registrationStartDate}</p>
                    <p className="text-gray-600 mb-2">Registration end date: {session.registrationEndDate}</p>
                    <p className="text-gray-600 mb-2">Class start time: {session.classStartDate}</p>
                    <p className="text-gray-600 mb-2">Class end date: {session.classEndDate}</p>
                    <p className="text-gray-600 mb-2">Session duration: {session.sessionDuration}</p>
                    <p className="text-gray-600 mb-2">Registration fee: $ {session.registrationFee}</p>
                    <button className={`px-3 py-2 rounded-md ${session.status === 'approved' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                        {session.status === 'approved' ? 'Ongoing' : 'Closed'}
                    </button>
                    {/* Disable the Book now button if the logged user is an admin or tutor. */}
                    {role === 'student' && (
                        <button
                            className="px-3 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white ml-2">Book now</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SessionDetails;
