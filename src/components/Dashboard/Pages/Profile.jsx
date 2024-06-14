import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Profile = () => {
    const { user } = useAuth();
    const [role, isLoading] = useRole();

    if (isLoading) return <LoadingSpinner />

    console.log(role);

    return (
        <div>
            {
                user &&
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Personal Details</h3>
                        {/* photoUrl */}
                        <div className="mt-2">
                            <img className="rounded h-36 w-36 object-cover object-center" src={user.photoURL} alt="" />
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.displayName}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{role}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                <span className="flex items-center space-x-1">
                                    <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Verified</dd>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 bg-cyan-600 rounded-full text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                    </svg>
                                </span>
                            </div>
                        </dl>
                    </div>
                </div>
            }
        </div>
    );
};

export default Profile;
