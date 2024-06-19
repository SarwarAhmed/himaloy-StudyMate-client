import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { ExclamationTriangleIcon, LinkIcon, PencilIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

const SessionData = ({ session, refetch }) => {

    const { user } = useAuth();
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosSecure.delete(`/session/${user?.email}/${session?._id}`);
            return data;
        },
        onSuccess: () => {
            refetch();
            Swal.fire({
                title: 'Session deleted successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        },
        onError: (error) => {
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });

    const handleDelete = async () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    mutateAsync();
                }
            }
            );
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    return (
        <li key="id" className="flex flex-col md:flex-row justify-between gap-x-6 py-5" >
            <div className="flex min-w-0 gap-x-4 mb-5 md:mb-0">
                <div className="min-w-0 flex-auto">
                    <Link to={`/dashboard/session/${session._id}`} className="text-base hover:underline font-semibold leading-6 text-gray-900">
                        {session.title}
                    </Link>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Last Update: {new Date(session.timestamp).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="xhidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <div className="flex space-x-2">
                    <span className="">
                        <Link
                            to={`/dashboard/session/edit/${session._id}`}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Edit
                        </Link>
                    </span>

                    <span className="">
                        <Link
                            to={`/dashboard/session/${session.tutorEmail}/${session._id}`}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            View
                        </Link>
                    </span>

                    <span className="sm:ml-3">
                        <button
                            onClick={handleDelete}
                            type="button"
                            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <div className="mx-auto flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0">
                                <ExclamationTriangleIcon className="h-4 w-4 text-red-600" aria-hidden="true" />
                            </div>
                            <span className='ml-1'>Delete</span>
                        </button>
                    </span>
                </div>
            </div>
        </li >
    );
};

SessionData.propTypes = {
    session: PropTypes.object,
    refetch: PropTypes.func
}


export default SessionData;
