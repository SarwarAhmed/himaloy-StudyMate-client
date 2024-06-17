import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CreateNotes = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async note => {
            const { data } = await axiosSecure.post('/create-note', note)
            return data
        },
        onSuccess: () => {
            navigate('/dashboard/manage-personal-notes')
            Swal.fire({
                title: 'Note created successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        },
        onError: (error) => {
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const details = form.details.value
        const note = {
            title,
            details,
            studentEmail: user.email
        }

        mutateAsync(note)
    };

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
                                    defaultValue={''}
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

export default CreateNotes;
