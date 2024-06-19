import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2"

const EditSession = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        data: session = [],
        isLoading,
    } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/session/${user?.email}/${id}`);
            return data;
        },
    });

    console.log(24, session);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const session = {
            title,
            description,
            tutorEmail: user.email
        };

        try {
            await axiosSecure.put(`/session/${user?.email}/${id}`, session);
            Swal.fire({
                title: 'Session updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate(`/dashboard/session/${session?.tutorEmail}/${id}`);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <div className="isolate bg-white">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold">Edit Session</h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="title" className="text-left block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" name="title" id="title" defaultValue={session.title} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="details" className="text-left block text-sm font-medium text-gray-700">Details</label>
                                <textarea name="description" id="details" rows="4" defaultValue={session.description} className="mt-1 p-2 w-full border border-gray-300 rounded-md"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditSession;
