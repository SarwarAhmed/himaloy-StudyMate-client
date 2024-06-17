import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import NotesData from "./NotesData";

const ManageNotes = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    // app.get('/notes/:email')

    const {
        data: notes = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['notes', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/notes/${user?.email}`);

            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <ul role="list" className="divide-y divide-gray-100">
                {/* {bookedSessions.map((bookedSession) => ( */}
                {notes.map(note => (
                    <NotesData key={note._id}
                        note={note}
                        refetch={refetch} />
                ))}
                {/* ))} */}
            </ul>
        </div>
    );
};

export default ManageNotes;
