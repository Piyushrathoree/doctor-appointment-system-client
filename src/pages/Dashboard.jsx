import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookAppointmentDialog from "./BookAppointmentDialog";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [openBook, setOpenBook] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-[400px] w-full p-2">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-4 sm:p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">
                    Welcome{user?.email ? `, ${user.email}` : ""}!
                </h2>
                <p className="text-gray-600 mb-4">
                    Role: {user?.role || "N/A"}
                </p>
                <div className="flex flex-col gap-3 w-full">
                    {user?.role === "patient" && (
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                            onClick={() => setOpenBook(true)}
                        >
                            Book Appointment
                        </button>
                    )}
                    <button
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition"
                        onClick={() => navigate("/appointments")}
                    >
                        Appointments
                    </button>
                </div>
                <BookAppointmentDialog
                    open={openBook}
                    onClose={() => setOpenBook(false)}
                />
            </div>
        </div>
    );
};

export default Dashboard;
