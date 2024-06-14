import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { Link } from "react-router-dom";

const Tutors = () => {
    const {
        data: tutors = [],
        isLoading,
    } = useQuery({
        queryKey: 'tutors',
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tutors`)
            const data = await response.json()
            return data
        },
    })

    console.log(tutors);


    return (
        <div className="container mx-auto px-5">
            <h1 className="text-2xl font-bold mb-4 col-span-3 text-center py-10 underline text-cyan-700 border-cyan-700">See our Tutors</h1>

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <div className="bg-white py-24 sm:py-32">
                        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Teachers</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">StudyMate is one of our best teaching practices. It has proved to be very effective since students can take their learning anywhere...</p>
                            </div>
                            <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                                {tutors.map((person) => (
                                    <li key={person.name}>
                                        <div className="flex items-center gap-x-6">
                                            <img className="h-16 w-16 rounded-full" src={`https://picsum.photos/200/300?random=${person.name}`} alt="" />
                                            <div>
                                                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                                <div className='flex gap-2'>
                                                    <Link className="text-sm font-semibold leading-6 text-indigo-600">
                                                        <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                                            <path fill="#212121" fillRule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clipRule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
                                                        </svg>
                                                    </Link>
                                                    <Link className="text-sm font-semibold leading-6 text-indigo-600">
                                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                                            <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tutors;
