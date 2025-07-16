import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post(
                "https://doctor-appointment-system-server-1.onrender.com/api/users/login",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[400px] w-full mt-40 p-2 text-lg">
            <div className="bg-white rounded-lg shadow-xl w-full sm:max-w-md max-w-sm p-6 text-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">
                            Login to your account
                        </h2>
                        <p className="text-gray-600 text-base w-70">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <button
                        className="text-blue-600 font-semibold hover:underline text-base mt-5"
                        onClick={() => navigate("/register")}
                    >
                        Sign Up
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label className="font-medium mt-2">Email</label>
                    <input
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        placeholder="m@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="flex justify-between items-center mt-2">
                        <label className="font-medium">Password</label>
                    </div>
                    <input
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <div className="bg-red-100 text-red-700 rounded px-3 py-2 text-base mt-2">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition mt-2 text-xl"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
