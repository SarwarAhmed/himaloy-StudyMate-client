import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import { differenceInDays } from 'date-fns'
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateSession = () => {
    const { user } = useAuth();
    const { navigate } = useNavigate();
    const [registrationStartDate, setRegistrationStartDate] = useState(new Date());
    const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
    const [classStartDate, setClassStartDate] = useState(new Date());
    const [classEndDate, setClassEndDate] = useState(new Date());
    // Tutor will create a session with the following fields:
    // a.Session Title
    // b.Tutor name read - only(Logged in user name)
    // c.Tutor email read - only(Logged in user email)
    // d.session Description
    // e.Registration start date
    // f.Registration end date
    // g.Class start date
    // h.Class end date
    // i.Session duration
    // j.Registration fee read - only( default 0)(only admin can modify this field, just set it to 0)
    // k.Status( default pending)
    // l.Any other necessary info if you need

    // /create-session/:email

    const { mutateAsync } = useMutation({
        mutationFn: async (session) => {
            const { data } = await axiosSecure.post(`/create-session/${user?.email}`, session);
            return data;
        },
        onSuccess: () => {
            // navigate('/dashboard/manage-sessions');
            Swal.fire({
                title: 'Session created successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        },
        onError: () => {
            Swal.fire({
                title: 'Error',
                text: "Something went wrong. Please try again later.",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const session = {
            title,
            description,
            registrationStartDate,
            registrationEndDate,
            classStartDate,
            classEndDate,
            tutorName: user.displayName,
            tutorEmail: user.email,
            sessionDuration: differenceInDays(classEndDate, classStartDate),
            registrationFee: 0,
            status: "pending",
        }
        mutateAsync(session);
        console.table(session);
    }

    return (
        <div className="isolate bg-white px-6">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create a Session</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Fill the form below to create a session.
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-5 max-w-xl sm:mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                            Session Title
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                autoComplete="title"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="registration-start-date" className="block text-sm font-semibold leading-6 text-gray-900">
                            Registration Start Date
                        </label>
                        <div className="mt-2.5">
                            <DatePicker
                                selected={registrationStartDate}
                                onChange={(date) => setRegistrationStartDate(date)}
                                selectsStart
                                startDate={registrationStartDate}
                                endDate={registrationEndDate}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Registration End Date
                        </label>
                        <div className="mt-2.5">
                            <DatePicker
                                selected={registrationEndDate}
                                onChange={(date) => setRegistrationEndDate(date)}
                                selectsEnd
                                startDate={registrationStartDate}
                                endDate={registrationEndDate}
                                minDate={registrationStartDate}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="class-start-date" className="block text-sm font-semibold leading-6 text-gray-900">
                            Class Start Date
                        </label>
                        <div className="mt-2.5">
                            <DatePicker
                                selected={classStartDate}
                                onChange={(date) => setClassStartDate(date)}
                                selectsStart
                                startDate={classStartDate}
                                endDate={classEndDate}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="class-end-date" className="block text-sm font-semibold leading-6 text-gray-900">
                            Class End Date
                        </label>
                        <div className="mt-2.5">
                            <DatePicker
                                selected={classEndDate}
                                onChange={(date) => setClassEndDate(date)}
                                selectsEnd
                                startDate={classStartDate}
                                endDate={classEndDate}
                                minDate={classStartDate}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                            Session description
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="description"
                                id="description"
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
                        Create Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSession;
