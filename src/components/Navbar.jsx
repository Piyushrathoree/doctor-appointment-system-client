import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-lg px-20  py-2 min-w-[320px] max-w-3xl flex items-center justify-evenly   ">
            <div className="flex items-center gap-4">
                <Link
                    to="/dashboard"
                    className="font-bold text-lg text-gray-800 sm:mr-10 hover:text-blue-600 transition"
                >
                    AppointMe
                </Link>
                <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                    Dashboard
                </Link>
                <Link
                    to="/appointments"
                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                    Appointments
                </Link>
                {user.role === "doctor" && (
                    <Link
                        to="/users"
                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                        Users
                    </Link>
                )}
            </div>
            <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 sm:ml-10 text-white font-semibold px-4 py-1.5 rounded-lg shadow transition"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
