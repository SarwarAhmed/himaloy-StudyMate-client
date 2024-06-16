import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const DetailsBookedSession = () => {
    const { id } = useParams();
    const {user} = useAuth();

    const {
        data: bookedSession = [],
        isLoading,
    } = useQuery({
        queryKey: ['booked-session', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/view-booked-session/${id}`);
            return data
        },
    })

    const handelRating = async (e) => {
        e.preventDefault();

        const form = e.target;

        const review = form.review.value;
        const rating = form.rating.value;
        const sessionId = bookedSession._id;
        const userEmail = user.email;

        try {
            const { data } = await axiosSecure.post(`/review`, {
                review,
                sessionId,
                userEmail,
                rating: parseInt(rating),
            });

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }




    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet>
                <title>StudyMate || {bookedSession.title}</title>
            </Helmet>
            <div className="container mx-auto px-5">
                <div>
                    <div className="">
                        {/* <img src={`https://picsum.photos/200/300?random=${bookedSession.id}`} alt="" className="w-full h-96 object-cover rounded-lg mb-4" /> */}
                        <div className="">
                            <h1 className="xabsolute xbg-cyan-600 h-full rounded-lg bg-opacity-60 top-0 text-white text-4xl font-bold mb-4 mx-auto w-full text-center underline border-cyan-700">
                            </h1>
                        </div>
                        <div className="">
                            <div className="bg-cyan-50 xml-[13%] rounded-lg shadow-md p-4 mb-4 x-mt-40 z-10 w-3/4">
                                <div className="w-full mx-auto">
                                    <div>
                                        <h2 className="text-lg font-bold mb-2">{bookedSession.title}</h2>
                                        <p className="text-gray-600 mb-2">{bookedSession.description}</p>
                                        <p className="text-gray-600 mb-2">Tutor: {bookedSession.tutorName}</p>
                                        <p className="text-gray-600 mb-2">Average rating: {bookedSession.rating}</p>
                                        <p className="text-gray-600 mb-2">Registration start date: {bookedSession.registrationStartDate}</p>
                                        <p className="text-gray-600 mb-2">Registration end date: {bookedSession.registrationEndDate}</p>
                                        <p className="text-gray-600 mb-2">Class start time: {bookedSession.classStartDate}</p>
                                        <p className="text-gray-600 mb-2">Class end date: {bookedSession.classEndDate}</p>
                                        <p className="text-gray-600 mb-2">bookedSession duration: {bookedSession.bookedSessionDuration}</p>
                                        <p className="text-gray-600 mb-2">Registration fee: $ {bookedSession.registrationFee}</p>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* review and rating */}
                {/* Create a review section on the detailed page. Students can post a
                review and rating for the study session. */}
                <div className="mt-10">
                    <div className="bg-cyan-50 rounded-lg shadow-md p-4 mb-4">
                        <h2 className="text-lg font-bold mb-2">Reviews</h2>
                        <form
                            onSubmit={handelRating}
                        >
                            <div className="mb-4">
                                <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                                    Review
                                </label>
                                <textarea
                                    id="review"
                                    name="review"
                                    rows={3}
                                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                                    placeholder="Write your review here"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                    Rating
                                </label>
                                <span className="text-xs text-gray-500">
                                    Please rate the session from 1 to 5
                                </span>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    pattern={`/^[1-5]$/`}
                                    required
                                    className="
                                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                    mt-1 block w-16 shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                                    placeholder="4"
                                />
                            </div>
                            {/* <div className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </div> */}
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsBookedSession;
