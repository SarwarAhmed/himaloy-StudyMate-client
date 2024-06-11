import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || { pathname: '/' };
    const { signInWithGoogle, signIn, loading, setLoading, resetPassword } = useAuth();

    const [email, setEmail] = useState('');

    const handleSignIn = async e => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true);
            await signIn(email, password);

            navigate(from);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
            });
        }
    };


    const handleResetPassword = async () => {
        if (!email) return Swal.fire({
            icon: 'error',
            title: 'Email is required',
        });
        try {
            await resetPassword(email);

            Swal.fire({
                icon: 'success',
                title: 'Password reset link sent to your email',
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Password reset failed',
                text: error.message,
            });
            setLoading(false);
        }
    }

    // google sign in
    const handleGoolgeSingIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();

            navigate('/');
            // toast.success('User created successfully');
        } catch (error) {
            // toast.error(error.message);
        }
    }


    return (
        <div className="min-h-[calc(100vh-168px)] flex xmin-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleSignIn}
                    className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onBlur={e => setEmail(e.target.value)}
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

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                <div className="mt-2 flex items-center justify-between">
                    <button
                        onClick={handleResetPassword}
                        className="text-sm">
                        <span href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </span>
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link
                        to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
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
            </div>
        </div>
    );
};

export default Login;
