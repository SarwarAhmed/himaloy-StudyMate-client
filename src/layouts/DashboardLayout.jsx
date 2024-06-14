import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuItems,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import StudentMenu from '../components/Shared/Menu/StudentMenu';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import TutorMenu from '../components/Shared/Menu/TutorMenu';
import AdminMenu from '../components/Shared/Menu/AdminMenu';

const DashboardLayout = () => {
    const [role, isLoading] = useRole();

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    if (isLoading) {
        return <LoadingSpinner />
    }

    console.log(role);

    return (
        <div className="bg-white">
            <Helmet>
                <title>StudyMate || Dashboard</title>
            </Helmet>
            <Navbar />
            <div>
                {/* Mobile filter dialog */}
                <Transition show={mobileFiltersOpen}>
                    <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <TransitionChild
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </TransitionChild>

                        <div className="fixed inset-0 z-40 flex">
                            <TransitionChild
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    {/* Mobile menu */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            <li className='space-y-4 flex flex-col'>
                                                {/* if user role is student the show the student menu */}
                                                {role === 'student' && <StudentMenu />}
                                                {/* if user role is tutor the show the tutor menu */}
                                                {role === 'tutor' && <TutorMenu />}
                                                {/* if user role is admin the show the admin menu */}
                                                {role === 'admin' && <AdminMenu />}
                                            </li>
                                        </ul>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome to
                            <Link to='/dashboard' className='text-cyan-500 hover:underline ml-3'>Dashboard</Link>
                        </h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    </MenuItems>
                                </Transition>
                            </Menu>


                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                {/* <FunnelIcon className="h-5 w-5" aria-hidden="true" /> */}
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            {/* Desktop */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-base font-medium text-gray-900">
                                    {/* if user role is student the show the student menu */}
                                    {role === 'student' && <StudentMenu />}
                                    {/* if user role is tutor the show the tutor menu */}
                                    {role === 'tutor' && <TutorMenu />}
                                    {/* if user role is admin the show the admin menu */}
                                    {role === 'admin' && <AdminMenu />}
                                </ul>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <Outlet />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
