import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { LinkIcon } from "@heroicons/react/24/outline";

const ViewBookedSessions = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    const {
        data: bookedSessions = [],
        isLoading,
    } = useQuery({
        queryKey: ['booked-sessions', user.email],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure(`/booked-sessions/${user?.email}`);
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    });

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <ul role="list" className="divide-y divide-gray-100">
                {bookedSessions.map((bookedSession) => (
                    <li key={bookedSession._id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900 hover:underline">
                                    <Link
                                        to={`/dashboard/view-booked-session/${bookedSession.sessionId}`}
                                        >
                                        {bookedSession.sessionTitle}
                                    </Link>
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    Instructor Email: {bookedSession.tutorEmail}</p>
                            </div>
                        </div>
                        <div className="xhidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                            </p>
                            <Link
                                to={`/dashboard/view-booked-session/${bookedSession.sessionId}`}
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                View Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewBookedSessions;
