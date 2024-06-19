import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import SessionData from "../SessionDetails/SessionData";

const AllSessions = () => {
    const {
        data: sessions = [],
        isLoading: isLoading,
        refetch
    } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-sessions`);

            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />
    return (
        <div className="bg-white">
            <ul role="list" className="divide-y divide-gray-100">
                {sessions.map(session => (
                    <SessionData key={session._id}
                        session={session}
                        refetch={refetch} />
                ))}
            </ul>
        </div>
    );
};

export default AllSessions;
