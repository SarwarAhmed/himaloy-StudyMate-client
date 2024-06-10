import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth()
    return (
        <Disclosure as="nav" className="bg-rose-300">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link to={'/'}>
                                        <h2 className='font-bold text-gray-100'>Study Mate</h2>
                                    </Link>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4 font-bold">

                                        <NavLink to={'/'}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                                                    : "px-4 py-2 rounded-md"
                                            }
                                        >Home</NavLink>
                                        <NavLink to={'/ourteam'}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "bg-gray-900 text-white px-4 py-2 rounded-md"
                                                    : "px-4 py-2 rounded-md"
                                            }
                                        >About</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">

                                    {/* Profile dropdown */}
                                    {/* Desktop device either logged in or not */}
                                    {
                                        user ?
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button
                                                        className="relative flex max-w-xs items-center rounded-full
                                                        bg-gray-800 text-sm focus:outline-none focus:ring-2
                                                        focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >

                                                    <Menu.Items
                                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Link
                                                                to={'/settings'}
                                                                className='text-left block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-200'>
                                                                Settings
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <button
                                                                onClick={logOut}
                                                                className='text-left block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-200'>
                                                                Log Out
                                                            </button>
                                                        </Menu.Item>

                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                            :
                                            <div className='mt-3 space-y-1 px-2'>
                                                {/* TODO active link activation */}
                                                <Link
                                                    to={'/login'}
                                                    className='block rounded-md px-3 py-2 text-base font-medium text-gray-800 bg-gray-50 hover:bg-gray-700 hover:text-white'
                                                >Log In</Link>
                                            </div>
                                    }

                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            <Disclosure.Button className="w-full text-left">

                                <NavLink to={'/'}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-700 hover:text-white"
                                            : "block rounded-md px-3 py-2 text-base font-medium text-gray-200  hover:text-white"
                                    }
                                >Home</NavLink>
                            </Disclosure.Button>

                            <Disclosure.Button className="w-full text-left">

                                <NavLink to={'/ourteam'}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-700 hover:text-white"
                                            : "block rounded-md px-3 py-2 text-base font-medium text-gray-200  hover:text-white"
                                    }
                                >About</NavLink>
                            </Disclosure.Button>

                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            {/* For mobile device condition rendering either logged in or Not */}
                            {
                                user ?
                                    <>
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0">
                                            </div>
                                            <div className="ml-3 space-y-1">
                                                <div className="text-base font-medium leading-none text-white">{user.displayName}</div>
                                                <div className="text-sm font-medium leading-none text-white">{user.email}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 space-y-4 px-2 flex flex-col text-white">
                                            <NavLink
                                                to={'/profile'}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-700 hover:text-white"
                                                        : "block rounded-md px-3 py-2 text-base font-medium text-gray-200  hover:text-white"
                                                }
                                            >Your Profile</NavLink>
                                            <NavLink
                                                to="/settins"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block rounded-md px-3 py-2 text-base font-medium text-gray-200 bg-gray-700 hover:text-white"
                                                        : "block rounded-md px-3 py-2 text-base font-medium text-gray-200  hover:text-white"
                                                }
                                            >Settings</NavLink>
                                            <button
                                                onClick={logOut}
                                                className='text-left block px-4 py-2 text-sm text-gray-200 xw-full'>
                                                Log Out
                                            </button>

                                        </div>
                                    </>
                                    :
                                    <div className='mt-3 space-y-1 px-2'>
                                        <Disclosure.Button>
                                            <Link
                                                to={'/login'}
                                                className='xblock rounded-md px-3 py-2 text-base font-medium bg-white text-gray-400 hover:bg-gray-700 hover:text-white'
                                            >Log In</Link>
                                        </Disclosure.Button>
                                    </div>
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    );
};

export default Navbar;
