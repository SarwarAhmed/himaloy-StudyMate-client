import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { format } from "date-fns";
import { CalendarDaysIcon, CalendarIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const SessionDetailsDashboard = () => {
    const { email, id } = useParams();
    const [rating, setRating] = useState(0);

    console.log(email, id);

    const {
        data: session = [],
        isLoading,
    } = useQuery({
        queryKey: ['session', email, id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/session/${email}/${id}`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet>
                <title>StudyMate || title</title>
            </Helmet>
            <div className="container mx-auto px-5">
                <div>
                    <div className="">
                        <div className="">
                            <h1 className="h-full rounded-lg bg-opacity-60 xtop-0 text-gray-700 text-4xl font-bold mb-4 mx-auto w-full text-center underline">
                                <p className="mt-10">Session Details</p>
                            </h1>
                        </div>
                        <div className="">
                            <div className="bg-cyan-50 ml-[13%] rounded-lg shadow-md p-4 mb-4  z-10  w-3/4">
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
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-2 flex items-center text-sm text-yellow-500">
                                                <CalendarIcon className="mr-1.5 h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Reg End on:<span className="ml-1">{format(new Date(session.registrationEndDate), 'dd/MM/yyyy')}</span>
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
                                        <span className="">
                                            <Link
                                                to={`/dashboard/session/edit/${session._id}`}
                                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Edit
                                            </Link>
                                        </span>
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

export default SessionDetailsDashboard;


// 27 day 12:00 Jed   27 Day 14:15 Kwi  ku 788
// 27 Evening 18:00  28 night 2:30 dac
