import React, { useEffect, useState } from "react";
import axios from "axios";

const BookAppointmentDialog = ({ open, onClose }) => {
    const [form, setForm] = useState({
        doctorId: "",
        date: "",
        time: "",
        symptoms: "",
        patientName: localStorage.getItem("patientName") || "",
    });
    const [doctors, setDoctors] = useState([]);
    const [bookingError, setBookingError] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!open) return;
        setForm({
            doctorId: "",
            date: "",
            time: "",
            symptoms: "",
            patientName: localStorage.getItem("patientName") || "",
        });
        setBookingError("");
        setBookingSuccess("");
        setLoading(false);
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/users?role=doctor"
                );
                setDoctors(res.data);
            } catch {
                // Optionally log or handle error
            }
        };
        fetchDoctors();
    }, [open]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === "patientName") {
            localStorage.setItem("patientName", e.target.value);
        }
    };

    const handleBook = async () => {
        setBookingError("");
        setBookingSuccess("");
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/appointments", {
                ...form,
                patientEmail: user.email,
            });
            setBookingSuccess("Appointment booked successfully!");
            setTimeout(() => {
                setLoading(false);
                onClose();
                window.location.reload();
            }, 1000);
        } catch (err) {
            setBookingError(err.response?.data?.message || "Booking failed");
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs sm:max-w-sm text-center">
                <h3 className="text-lg font-semibold mb-2">Book Appointment</h3>
                <form
                    className="flex flex-col gap-3 mt-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleBook();
                    }}
                >
                    <label className="text-left font-medium">Doctor</label>
                    <select
                        name="doctorId"
                        value={form.doctorId}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                            <option key={doc._id} value={doc._id}>
                                {doc.email}
                            </option>
                        ))}
                    </select>
                    <label className="text-left font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="text-left font-medium">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="text-left font-medium">Symptoms</label>
                    <input
                        type="text"
                        name="symptoms"
                        value={form.symptoms}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="text-left font-medium">
                        Patient Name
                    </label>
                    <input
                        type="text"
                        name="patientName"
                        value={form.patientName}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {bookingError && (
                        <div className="bg-red-100 text-red-700 rounded px-3 py-2 text-sm mt-2">
                            {bookingError}
                        </div>
                    )}
                    {bookingSuccess && (
                        <div className="bg-green-100 text-green-700 rounded px-3 py-2 text-sm mt-2">
                            {bookingSuccess}
                        </div>
                    )}
                    <div className="flex justify-center gap-4 mt-2">
                        <button
                            type="button"
                            className="px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            disabled={loading}
                        >
                            {loading ? "Booking..." : "Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookAppointmentDialog;
