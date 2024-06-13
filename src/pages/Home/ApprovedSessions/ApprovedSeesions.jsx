import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ApprovedSeesions = () => {
    const {
        data: approvedSessions = [],
        isLoading,
    } = useQuery({
        queryKey: 'approved-sessions',
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions`)
            const data = await response.json()
            return data
        },
    })


    console.log(approvedSessions);

    return (
        // Note: Do the necessary beautification of this section.
        <div className="container mx-auto px-5">
            <h1 className="text-2xl font-bold mb-4 col-span-3 text-center py-10 underline text-cyan-700 border-cyan-700">Sessions</h1>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {approvedSessions.map((session) => (
                        <div key={session._id} className="bg-cyan-50 rounded-lg shadow-md p-4 mb-4">
                            <h2 className="text-lg font-bold mb-2">{session.title}</h2>
                            <p className="text-gray-600 mb-2">{session.description}</p>
                            <button className={`px-3 py-1 rounded-md ${session.status === 'approved' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                                {session.status === 'approved' ? 'Ongoing' : 'Closed'}
                            </button>
                            <button className="px-3 py-1 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white ml-2">Read More</button>
                        </div>
                    ))}
                </div>
            )}
            <div className='flex items-center justify-center'>
                {
                    approvedSessions.length > 2 && (
                        <button className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white">See all sessions</button>
                    )
                }
            </div>
        </div>
    );
};

export default ApprovedSeesions;
