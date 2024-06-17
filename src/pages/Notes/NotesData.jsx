import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const NotesData = ({ note, refetch }) => {
    return (
        <li key="id" className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {note.title}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Last Update: {new Date(note.timestamp).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="xhidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <div className="flex space-x-2">
                    <Link
                        to="/"
                        className="mt-1 flex items-center gap-x-1.5">
                        <p className="text-base hover:underline leading-5 text-gray-500">View</p>
                    </Link>
                    <Link
                        to="/"
                        className="mt-1 flex items-center gap-x-1.5">
                        <p className="text-base hover:underline leading-5 text-gray-500">Edit</p>
                    </Link>
                    <button
                        to="/"
                        className="mt-1 flex items-center gap-x-1.5">
                        <p className="text-base hover:underline leading-5 text-gray-500">Delete</p>
                    </button>
                </div>
            </div>
        </li>
    );
};

NotesData.propTypes = {
    note: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired
}

export default NotesData;
