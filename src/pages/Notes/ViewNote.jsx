import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { PencilIcon } from "@heroicons/react/24/outline";

const ViewNote = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const {
        data: note = [],
        isLoading,
    } = useQuery({
        queryKey: ['note', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/note/${user?.email}/${id}`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <div className="container mx-auto px-5">
                <div>
                    <div className="">
                        <div className="flex">
                            <div className="w-1/2">
                                <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    Last Update: {new Date(note.timestamp).toLocaleDateString()}
                                </p>
                                <p className="text-lg text-gray-600">{note.details}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link
                                to={`/dashboard/note/edit/${note._id}`}
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewNote;
