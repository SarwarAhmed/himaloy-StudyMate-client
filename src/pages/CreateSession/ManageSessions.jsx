import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SessionData from "../SessionDetails/SessionData";

const ManageSessions = () => {
    const { user } = useAuth();


    const {
        data: sessions = [],
        isLoading: isLoading,
        refetch
    } = useQuery({
        queryKey: ['sessions', user.email],
        queryFn: async () => {

            const { data } = await axiosSecure(`/view-sessions/${user?.email}`);

            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />

    return (
<div>
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

export default ManageSessions;
