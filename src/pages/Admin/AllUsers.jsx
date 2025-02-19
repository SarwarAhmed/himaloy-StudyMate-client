import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllUsers = () => {

    const {
        data: users = [],
        isLoading,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');

            return data;
        },
    });


    if (isLoading) return <LoadingSpinner />

    console.log(users);

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {users?.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                        </div>
                    </div>
                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                        {person.lastSeen ? (
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Last seen <time dateTime={person.lastSeenDateTime}>{person.role}</time>
                            </p>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">{person.status}</p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default AllUsers;
