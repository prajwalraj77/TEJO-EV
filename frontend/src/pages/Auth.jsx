import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            if (isLogin) {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/login`,
                    {
                        email: formData.email,
                        password: formData.password,
                    }
                );

                const token = response.data.token;

                localStorage.setItem("token", token);

                setMessage("Login successful.");

                setTimeout(() => {
                    navigate("/");
                }, 500);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/register`,
                    {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.phone,
                    }
                );

                setMessage(
                    response.data.message || "Registration successful."
                );

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                });

                setTimeout(() => {
                    setIsLogin(true);
                    setMessage("");
                }, 1000);
            }
        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Left Section */}
                <div className="hidden lg:block">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                        TEJO EV
                    </p>

                    <h1 className="mt-5 text-5xl xl:text-6xl font-bold leading-tight">
                        Smart Electric
                        <span className="block">
                            Mobility Starts Here
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-gray-600 leading-7">
                        Create your TEJO EV account and manage your electric
                        mobility experience from one place.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-10 max-w-lg">

                        <div className="rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className="text-3xl">⚡</div>

                            <h3 className="mt-4 font-bold">
                                Smart Mobility
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Experience connected electric mobility.
                            </p>
                        </div>

                        <div className="rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className="text-3xl">🛠</div>

                            <h3 className="mt-4 font-bold">
                                Easy Service
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Book and manage your EV service easily.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Auth Card */}
                <div className="w-full max-w-md mx-auto">

                    <div className="rounded-3xl border bg-white p-6 sm:p-8 shadow-xl">

                        {/* Mobile Brand */}
                        <div className="lg:hidden text-center mb-8">

                            <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                                TEJO EV
                            </p>

                            <h1 className="mt-3 text-3xl font-bold">
                                Electric Mobility
                            </h1>

                        </div>

                        {/* Header */}
                        <div className="mb-8">

                            <p className="text-sm font-semibold uppercase tracking-widest">
                                {isLogin ? "Welcome Back" : "Get Started"}
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {isLogin ? "Login" : "Create Account"}
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                {isLogin
                                    ? "Login to manage your TEJO EV experience."
                                    : "Create an account to access TEJO EV services."}
                            </p>

                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name */}
                            {!isLogin && (
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold mb-2"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                        className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 focus:ring-2"
                                    />
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 focus:ring-2"
                                />
                            </div>

                            {/* Phone */}
                            {!isLogin && (
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-semibold mb-2"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        required
                                        className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 focus:ring-2"
                                    />
                                </div>
                            )}

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold mb-2"
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 focus:ring-2"
                                />
                            </div>

                            {/* Message */}
                            {message && (
                                <div className="rounded-xl border px-4 py-3 text-sm animate-pulse">
                                    {message}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    "Please wait..."
                                ) : (
                                    <span className="inline-flex items-center gap-2">
                                        {isLogin
                                            ? "Login"
                                            : "Create Account"}

                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </span>
                                )}
                            </button>

                        </form>

                        {/* Switch Login/Register */}
                        <div className="mt-8 text-center text-sm">

                            <span className="text-gray-500">
                                {isLogin
                                    ? "Don't have an account?"
                                    : "Already have an account?"}
                            </span>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setMessage("");
                                }}
                                className="ml-2 font-semibold underline underline-offset-4 transition-opacity duration-300 hover:opacity-60"
                            >
                                {isLogin ? "Register" : "Login"}
                            </button>

                        </div>

                    </div>

                    <p className="mt-6 text-center text-xs text-gray-500">
                        TEJO EV — Electric Mobility for a Better Future
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Auth;