import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const SessionDetails = () => {
    const [role, isLoading] = useRole();
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();
    const [rating, setRating] = useState(0);

    // get session by id from db
    const {
        data: session = {},
        isLoading: isLoading2,
    } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/session/${id}`);

            return data;
        },
    });

    // book session using mutation
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosCommon.post('/book-session', {
                role: role,
                sessionTitle: session.title,
                studentEmail: user.email,
                sessionId: session._id,
                tutorEmail: session.tutorEmail,
            })

            console.log(data);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Session booked successfully',
            })
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message,
            })
        },
    })

    // book session method
    const bookSession = async () => {
        if (role === 'admin' || role === 'tutor') {
            return Swal.fire({
                icon: 'error',
                title: `Unauthorized access for ${role} role`,
                text: 'You cannot book a session',
            })
        }
        await mutateAsync();
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isLoading2) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <Helmet>
                <title>StudyMate || {session.title}</title>
            </Helmet>
            <div className="container mx-auto px-5">
                <div>
                    <div className="relative">
                        <img src={`https://picsum.photos/200/300?random=${session.id}`} alt="" className="w-full h-96 object-cover rounded-lg mb-4" />
                        <div className="">
                            <h1 className="absolute bg-cyan-600 h-full rounded-lg bg-opacity-60 top-0 text-white text-4xl font-bold mb-4 mx-auto w-full text-center underline border-cyan-700">
                                <p className="mt-10">Session Details</p>
                            </h1>
                        </div>
                        <div className="">
                            <div className="bg-cyan-50 ml-[13%] rounded-lg shadow-md p-4 mb-4 -mt-40 z-10 absolute w-3/4">
                                <div className="w-full mx-auto">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">{session.title}</h2>
                                        <p className="text-gray-600 mb-2 text-xs uppercase font-bold">Tutor:
                                            <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                {session.tutorName}
                                            </span>
                                        </p>
                                        <div >
                                            <div className="mt-2 flex items-center text-sm text-yellow-500">
                                                <CalendarDaysIcon className="mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Class Start:<span className="ml-1">{format(new Date(session.classStartDate), `dd/MM/yyyy`)}</span>
                                                {/* <span>, {format(new Date(session.classStartDate), `hh:mm a`)}</span> */}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-2 flex items-center text-sm text-yellow-500">
                                                <CalendarIcon className="mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Reg End on:<span className="ml-1">{format(new Date(session.registrationEndDate), 'dd/MM/yyyy')}</span>
                                                {/* <span>, {format(new Date(session.registrationEndDate), `hh:mm a`)}</span> */}
                                            </div>
                                        </div>


                                        <p className="text-gray-600 my-2">{session.description}</p>
                                        <p className="text-gray-600 mb-2">Average rating: {rating || 'There is no raitng'}</p>
                                        <p className="text-gray-600 mb-2">
                                            Registration start date: {format(new Date(session.registrationStartDate), 'dd/MM/yyyy')}
                                        </p>

                                        <p className="text-gray-600 mb-2">
                                            Class end date: {format(new Date(session.classEndDate), `dd/MM/yyyy`)}
                                        </p>
                                        <p className="text-gray-600 mb-2">Session duration: {session.sessionDuration}</p>
                                        <p className="text-gray-600 mb-2">Registration fee: $ {session.registrationFee}</p>
                                        <button className={`px-3 py-2 rounded-md ${session.status === 'approved' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                                            {session.status === 'approved' ? 'Ongoing' : 'Closed'}
                                        </button>
                                        {/* Disable the Book now button if the logged user is an admin or tutor. */}
                                        {role === 'student' && (
                                            <button
                                                onClick={bookSession}
                                                className="px-3 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white ml-2">Book now</button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SessionDetails;
