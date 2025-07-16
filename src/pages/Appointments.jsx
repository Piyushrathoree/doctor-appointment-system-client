import { useEffect, useState } from "react";
import axios from "axios";

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [cancelId, setCancelId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (!user || user.role !== "doctor") {
            setError("Only doctors can view appointments.");
            setLoading(false);
            return;
        }
        const fetchAppointments = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await axios.get(
                    "https://doctor-appointment-system-server-1.onrender.com/api/appointments",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                setAppointments(res.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        "Failed to fetch appointments"
                );
            }
            setLoading(false);
        };
        fetchAppointments();
    }, []);

    const handleCancel = async () => {
        if (!cancelId) return;
        try {
            await axios.delete(
                `https://doctor-appointment-system-server-1.onrender.com/api/appointments/${cancelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setCancelDialogOpen(false);
            setCancelId(null);
            window.location.reload();
        } catch (err) {
            console.log(err);

            setError("Failed to cancel appointment");
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await axios.delete(
                `https://doctor-appointment-system-server-1.onrender.com/api/appointments/${deleteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setDeleteDialogOpen(false);
            setDeleteId(null);
            window.location.reload();
        } catch {
            setError("Failed to delete appointment");
        }
    };

    if (!user || user.role !== "doctor") {
        return (
            <div className="flex items-center justify-center min-h-[400px] w-full p-2">
                <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-gray-600">
                        Only doctors can view appointments.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[400px] w-full p-2 mt-20" >
            <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Appointments</h1>
                </div>
                {error && (
                    <div className="mb-2 text-red-600 font-medium">{error}</div>
                )}
                {loading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-2 border">Date</th>
                                    <th className="px-3 py-2 border">Time</th>
                                    <th className="px-3 py-2 border">
                                        Patient Email
                                    </th>
                                    <th className="px-3 py-2 border">Status</th>
                                    <th className="px-3 py-2 border">
                                        Symptoms
                                    </th>
                                    <th className="px-3 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(user.role === "doctor"
                                    ? appointments
                                    : appointments.filter(
                                          (appt) =>
                                              appt.patientId?.email ===
                                              user.email
                                      )
                                ).map((appt) => (
                                    <tr key={appt._id} className="border-b">
                                        <td className="px-3 py-2 border">
                                            {formatDate(appt.date)}
                                        </td>
                                        <td className="px-3 py-2 border">
                                            {appt.time}
                                        </td>
                                        <td className="px-3 py-2 border">
                                            {appt.patientEmail}
                                        </td>
                                        <td className="px-3 py-2 border">
                                            {appt.status || "pending"}
                                        </td>
                                        <td className="px-3 py-2 border">
                                            {appt.symptoms}
                                        </td>
                                        <td className="px-3 py-2 border space-x-2">
                                            {appt.status !== "cancelled" && (
                                                <button
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                                                    onClick={() => {
                                                        setCancelId(appt._id);
                                                        setCancelDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {((appt.status === "cancelled" &&
                                                (user.role === "doctor" ||
                                                    appt.patientEmail ===
                                                        user.email)) ||
                                                (user.role === "patient" &&
                                                    appt.patientEmail ===
                                                        user.email)) && (
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                                    onClick={() => {
                                                        setDeleteId(appt._id);
                                                        setDeleteDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* Cancel Dialog */}
                {cancelDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs text-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Cancel Appointment
                            </h3>
                            <p className="mb-4">
                                Are you sure you want to cancel this
                                appointment?
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    className="px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                                    onClick={() => setCancelDialogOpen(false)}
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-1.5 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                                    onClick={handleCancel}
                                >
                                    Yes, Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Delete Dialog */}
                {deleteDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs text-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Delete Appointment
                            </h3>
                            <p className="mb-4">
                                Are you sure you want to delete this
                                appointment?
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    className="px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                                    onClick={() => setDeleteDialogOpen(false)}
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-1.5 rounded bg-red-500 hover:bg-red-600 text-white font-medium"
                                    onClick={handleDelete}
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
