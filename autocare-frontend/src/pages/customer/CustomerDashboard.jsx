import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import bookingService from "../../services/bookingService";
import vehicleService from "../../services/vehicleService";

function CustomerDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [bookings, setBookings] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        setLoading(true);

        try {

            const [bookingResponse, vehicleResponse] = await Promise.all([

                bookingService.getMyBookings(),
                vehicleService.getMyVehicles()

            ]);

            setBookings(bookingResponse.data || []);
            setVehicles(vehicleResponse.data || []);

        }

        catch (error) {

            console.error("Dashboard Load Error:", error);

        }

        finally {

            setLoading(false);

        }

    };

            const bookingData = bookingResponse.data || [];

            const vehicleData = vehicleResponse.data || [];

            setBookings(bookingData);

            setVehicles(vehicleData);

        } catch (error) {

            console.error("Dashboard Load Error:", error);

        } finally {

            setLoading(false);

        }

    };

    const activeServices = bookings.filter(

        booking =>
            booking.status !== "COMPLETED" &&
            booking.status !== "CANCELLED"

    ).length;

    const recentBookings = [...bookings]

        .sort(
            (a, b) =>
                new Date(b.bookingDate) -
                new Date(a.bookingDate)
        )

        .slice(0, 5);

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status">

                    <span className="visually-hidden">

                        Loading...

                    </span>

                </div>

            </div>

        );

    }

    return (

        <div className="container py-5">

            {/* Hero */}

            <div className="row align-items-center mb-5">

                <div className="col-lg-8">

                    <h2 className="fw-bold">

                        Welcome back, {user?.fullName} 👋

                    </h2>

                    <p className="text-muted fs-5">

                        Keep your vehicle in perfect condition.
                        Book services, track repairs and manage invoices
                        from one dashboard.

                    </p>

                </div>

                <div className="col-lg-4 text-lg-end">

                    <Link
                        to="/customer/book-service"
                        className="btn btn-primary btn-lg">

                        <i className="bi bi-plus-circle me-2"></i>

                        Book New Service

                    </Link>

                </div>

            </div>

            {/* Statistics */}

            <div className="row g-4 mb-5">

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Vehicles

                                    </small>

                                    <h2 className="fw-bold mt-2">

                                        {vehicles.length}

                                    </h2>

                                </div>

                                <i className="bi bi-car-front-fill text-primary fs-1"></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Bookings

                                    </small>

                                    <h2 className="fw-bold mt-2">

                                        {bookings.length}

                                    </h2>

                                </div>

                                <i className="bi bi-calendar-check text-success fs-1"></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Active Services

                                    </small>

                                    <h2 className="fw-bold mt-2">

                                        {activeServices}

                                    </h2>

                                </div>

                                <i className="bi bi-tools text-warning fs-1"></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Invoices

                                    </small>

                                    <h2 className="fw-bold mt-2">

                                        0

                                    </h2>

                                </div>

                                <i className="bi bi-receipt text-danger fs-1"></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
                        {/* Quick Actions */}

                        <div className="card shadow border-0 mb-5">

                            <div className="card-header bg-white">

                                <h4 className="mb-0">

                                    Quick Actions

                                </h4>

                            </div>

                            <div className="card-body">

                                <div className="row g-4">

                                    <div className="col-lg-3 col-md-6">

                                        <Link
                                            to="/customer/vehicles"
                                            className="btn btn-outline-primary w-100 py-3">

                                            <i className="bi bi-car-front-fill me-2"></i>

                                            My Vehicles

                                        </Link>

                                    </div>

                                    <div className="col-lg-3 col-md-6">

                                        <Link
                                            to="/customer/book-service"
                                            className="btn btn-outline-success w-100 py-3">

                                            <i className="bi bi-calendar-plus me-2"></i>

                                            Book Service

                                        </Link>

                                    </div>

                                    <div className="col-lg-3 col-md-6">

                                        <Link
                                            to="/customer/bookings"
                                            className="btn btn-outline-warning w-100 py-3">

                                            <i className="bi bi-list-check me-2"></i>

                                            My Bookings

                                        </Link>

                                    </div>

                                    <div className="col-lg-3 col-md-6">

                                        <Link
                                            to="/customer/profile"
                                            className="btn btn-outline-dark w-100 py-3">

                                            <i className="bi bi-person-circle me-2"></i>

                                            Profile

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Recent Bookings */}

                        <div className="card shadow border-0">

                            <div className="card-header bg-white d-flex justify-content-between align-items-center">

                                <h4 className="mb-0">

                                    Recent Service Requests

                                </h4>

                                <Link
                                    to="/customer/bookings"
                                    className="btn btn-sm btn-primary">

                                    View All

                                </Link>

                            </div>

                            <div className="card-body">

                                <div className="table-responsive">

                                    <table className="table table-hover align-middle">

                                        <thead>

                                        <tr>

                                            <th>Vehicle</th>
                                            <th>Service</th>
                                            <th>Status</th>
                                            <th>Date</th>

                                        </tr>

                                        </thead>

                                        <tbody>

                                        {recentBookings.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center py-5 text-muted">

                                                    No bookings available.

                                                </td>

                                            </tr>

                                        ) : (

                                            recentBookings.map((booking) => (

                                                <tr key={booking.id}>

                                                    <td>

                                                        {booking.vehicleNumber}

                                                    </td>

                                                    <td>

                                                        {booking.serviceType}

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${
                                                                booking.status === "PENDING"
                                                                    ? "bg-warning text-dark"
                                                                    : booking.status === "IN_PROGRESS"
                                                                    ? "bg-primary"
                                                                    : booking.status === "COMPLETED"
                                                                    ? "bg-success"
                                                                    : "bg-danger"
                                                            }`}>

                                                            {booking.status}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {booking.bookingDate}

                                                    </td>

                                                </tr>

                                            ))

                                        )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                );

            }

            export default CustomerDashboard;