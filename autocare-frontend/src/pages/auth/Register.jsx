import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../../services/authService";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: "CUSTOMER"

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.fullName.trim()) {
            toast.error("Full name is required.");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required.");
            return;
        }

        if (!formData.phone.trim()) {
            toast.error("Phone number is required.");
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {
            toast.error("Phone number must be exactly 10 digits.");
            return;
        }

        if (!formData.address.trim()) {
            toast.error("Address is required.");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must contain at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            await authService.register({

                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                password: formData.password,
                role: "CUSTOMER"

            });

            toast.success("Account created successfully!");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (error) {

            const message =
                error.response?.data?.message ||
                "Registration failed.";

            toast.error(message);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-5 col-md-7">

                    <div className="card border-0 shadow-lg rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Join AutoCare
                                </h2>

                                <p className="text-muted">

                                    Create your AutoCare account to book vehicle
                                    services, track repairs, and manage your
                                    service history effortlessly.

                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email Address

                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Phone Number

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        placeholder="Enter 10 digit phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Address

                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="address"
                                        placeholder="Enter your address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    ></textarea>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Password

                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Minimum 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Confirm Password

                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Creating Account..."
                                        : "Join AutoCare"}

                                </button>

                            </form>

                            <hr className="my-4" />

                            <div className="text-center">

                                <span className="text-muted">

                                    Already with us?

                                </span>

                                {" "}

                                <Link
                                    to="/login"
                                    className="fw-semibold text-decoration-none"
                                >

                                    Login

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;