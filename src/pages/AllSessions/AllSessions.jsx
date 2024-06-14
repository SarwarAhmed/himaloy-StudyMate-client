import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const AllSessions = () => {
    const {
        data: sessions = [],
        isLoading,
    } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions`)
            const data = await response.json()
            return data
        },
    });

    return (
        <div>
            <div className="container mx-auto px-5 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        sessions.map((session) => (
                            <div key={session._id} className="bg-cyan-50 rounded-lg shadow-md p-4 mb-4">
                                <h2 className="text-lg font-bold mb-2">{session.title}</h2>
                                <p className="text-gray-600 mb-2">{session.description}</p>
                                <button className={`px-3 py-1 rounded-md ${session.status === 'approved' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                                    {session.status === 'approved' ? 'Ongoing' : 'Closed'}
                                </button>
                                <button className="px-3 py-1 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white ml-2">Read More</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllSessions;
