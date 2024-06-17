import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

const EditNote = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const details = form.details.value;
        const note = {
            title,
            details,
            studentEmail: user.email
        };

        try {
            await axiosSecure.put(`/note/${user.email}/${id}`, note);
            Swal.fire({
                title: 'Note updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate(`/dashboard/note/${id}`);
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

    console.log(note);

    return (
        <div>
            <div className="isolate bg-white">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Take a note
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Fill the form below to create a note.
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-10 max-w-xl">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                        <div className="sm:col-span-2">
                            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    autoComplete="title"
                                    defaultValue={note.title}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-2">
                            <label htmlFor="details" className="block text-sm font-semibold leading-6 text-gray-900">
                                Notes Details
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="details"
                                    id="details"
                                    required
                                    rows={4}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={note.details}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNote;
