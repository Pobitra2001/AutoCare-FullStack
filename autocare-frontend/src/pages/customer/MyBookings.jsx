import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import bookingService from "../../services/bookingService";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadBookings = async () => {

        try {

            setLoading(true);

            const response =
                await bookingService.getMyBookings();

            setBookings(response.data);

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load bookings."
            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadBookings();

    }, []);

    const cancelBooking = async (id) => {

        if (!window.confirm(
            "Are you sure you want to cancel this booking?"
        )) {
            return;
        }

        try {

            await bookingService.updateBookingStatus(
                id,
                "CANCELLED"
            );

            toast.success("Booking cancelled successfully.");

            loadBookings();

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to cancel booking."
            );

        }

    };

    const getBadge = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-warning text-dark";

            case "CONFIRMED":
                return "bg-primary";

            case "IN_PROGRESS":
                return "bg-info";

            case "COMPLETED":
                return "bg-success";

            case "CANCELLED":
                return "bg-danger";

            default:
                return "bg-secondary";
        }

    };

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                </div>

                <p className="mt-3">
                    Loading your bookings...
                </p>

            </div>

        );

    }

    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    My Bookings

                </h2>

                <button
                    className="btn btn-outline-primary"
                    onClick={loadBookings}
                >
                    Refresh
                </button>

            </div>

            {

                bookings.length === 0 ?

                    (

                        <div className="card shadow-sm">

                            <div className="card-body text-center py-5">

                                <i className="bi bi-calendar-x display-1 text-secondary"></i>

                                <h4 className="mt-3">

                                    No Bookings Found

                                </h4>

                                <p className="text-muted">

                                    You haven't booked any vehicle service yet.

                                </p>

                            </div>

                        </div>

                    )

                    :

                    (

                        <div className="table-responsive shadow-sm rounded">

                            <table className="table table-bordered table-hover align-middle">

                                <thead className="table-dark">

                                <tr>

                                    <th>#</th>

                                    <th>Vehicle</th>

                                    <th>Vehicle No.</th>

                                    <th>Service</th>

                                    <th>Booking Date</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                                </thead>

                                <tbody>

                                {

                                    bookings.map((booking, index) => (

                                        <tr key={booking.id}>

                                            <td>

                                                {index + 1}

                                            </td>

                                            <td>

                                                {booking.vehicleModel}

                                            </td>

                                            <td>

                                                {booking.vehicleNumber}

                                            </td>

                                            <td>

                                                {booking.serviceType.replaceAll("_", " ")}

                                            </td>

                                            <td>

                                                {booking.bookingDate}

                                            </td>

                                            <td>

                                                <span className={`badge ${getBadge(booking.status)}`}>

                                                    {booking.status.replaceAll("_", " ")}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    booking.status === "PENDING"

                                                        ?

                                                        (

                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() =>
                                                                    cancelBooking(
                                                                        booking.id
                                                                    )
                                                                }
                                                            >

                                                                Cancel

                                                            </button>

                                                        )

                                                        :

                                                        (

                                                            <span className="text-muted">

                                                                --

                                                            </span>

                                                        )

                                                }

                                            </td>

                                        </tr>

                                    ))

                                }

                                </tbody>

                            </table>

                        </div>

                    )

            }

        </div>

    );

}

export default MyBookings;