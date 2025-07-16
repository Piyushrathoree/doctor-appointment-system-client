import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roles = [
    { value: "patient", label: "Patient" },
    { value: "doctor", label: "Doctor" },
];

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post(
                "https://doctor-appointment-system-server-1.onrender.com/api/users/register",
                {
                    email,
                    password,
                    role,
                }
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[400px] w-full p-2 mt-40 text-lg">
            <div className="bg-white rounded-lg shadow-md w-full sm:max-w-md max-w-sm p-6 text-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">
                            Create an account
                        </h2>
                        <p className="text-gray-600 text-base">
                            Enter your details to register
                        </p>
                    </div>
                    <button
                        className="text-blue-600 font-semibold hover:underline text-base mt-1"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label className="font-medium mt-2 text-lg">Email</label>
                    <input
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        placeholder="m@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="font-medium mt-2 text-lg">Password</label>
                    <input
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="font-medium mt-2 text-lg">Role</label>
                    <select
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        {roles.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                    {error && (
                        <div className="bg-red-100 text-red-700 rounded px-3 py-2 text-base mt-2">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition mt-2 text-xl"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
