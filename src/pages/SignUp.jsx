import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../utils";

const SignUp = () => {
    const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading, user } = useAuth();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageText, setImageText] = useState('Please select an image')

    // if user logged in, redirect to home page
    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSumit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];
        const role = form.role.value;

        try {
            setLoading(true)

            // Upload image
            const image_url = await imageUpload(image);

            // console.log(data.data.display_url);

            // User registration
            const result = await createUser(email, password);
            console.log(result);

            // Save username and photo in firebase
            await updateUserProfile(name, image_url, role);

            console.log(result);
            navigate('/');
            //TODO
            // toast.success('User created successfully');
        } catch (error) {
            // TODO
            // toast.error(error.message);
            console.log(error.message);
        }
    }

    // Google Sign In
    const handleGoolgeSingIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();
            navigate('/');
            // TODO
            // toast.success('User created successfully');
        } catch (error) {
            // TODO
            // toast.error(error.message);
        }
    }

    const handleImagePreview = image => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    }

    if (user || loading) return null;
    return (
        <div className="flex xmin-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <Helmet>
                <title>StudyMate || Register</title>
            </Helmet>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleSumit}
                    className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                className="xblock relative w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                            Rote
                        </label>
                        <div className="mt-2">
                            <select
                                id="role"
                                name="role"
                                autoComplete="role-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option>Student</option>
                                <option>Tutors</option>
                                <option>Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className='py-3 relative'>
                        <div className='flex items-center space-x-3'>
                            {
                                imagePreview ?
                                    <div>
                                        <img src={imagePreview} alt='preview' className='h-12 w-12 object-cover rounded-lg mb-2' />
                                    </div>
                                    :
                                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                            }

                            <label>
                                <input
                                    className='text-sm cursor-pointer w-36 hidden rounded bg-white px-2.5 py-1.5 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                    type='file'
                                    onChange={(e) => handleImagePreview(e.target.files[0])}
                                    name='image'
                                    id='image'
                                    accept='image/*'
                                    hidden
                                />
                                <div className='cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                                    Upload Image
                                </div>
                            </label>
                        </div>
                        {
                            imageText &&
                            <p className='text-sm text-gray-500'>{imageText}</p>
                        }
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an Account?{' '}
                    <Link
                        to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
                {/* login in with goole or GitBub */}
                <div className="mt-6 flex space-x-3">
                    <button
                        onClick={() => handleGoolgeSingIn()}
                        className="flex w-full justify-center rounded-md bg-cyan-100 px-3 py-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="google" className="w-6 h-6" />
                        {/* <span className="ml-2">Login with Google</span> */}
                    </button>

                    {/* <button
                        onClick={() => gitHubLogin()}
                        className="flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" className="w-6 h-6" />
                        {/* <span className="ml-2">Login with GitHub</span> */}
                    {/* </button>  */}
                </div>
            </div >
        </div >
    );
};

export default SignUp;
