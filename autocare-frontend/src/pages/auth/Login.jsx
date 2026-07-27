import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await authService.login(formData);

            // Save token & user in AuthContext/localStorage
            login(response.data);

            const role = response.data.role;

            switch (role) {

                case "ADMIN":
                    navigate("/admin/dashboard");
                    break;

                case "STAFF":
                    navigate("/staff/dashboard");
                    break;

                case "CUSTOMER":
                default:
                    navigate("/customer/dashboard");
                    break;

            }

        } catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Invalid email or password."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-body p-5">

                            <h2 className="text-center mb-2">

                                Welcome Back

                            </h2>

                            <p className="text-center text-muted mb-4">

                                Login to your AutoCare account

                            </p>

                            {

                                error && (

                                    <div className="alert alert-danger">

                                        {error}

                                    </div>

                                )

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Password

                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >

                                    {

                                        loading

                                            ? "Logging in..."

                                            : "Login"

                                    }

                                </button>

                            </form>

                            <hr className="my-4" />

                            <div className="text-center">

                                <span className="text-muted">

                                    New to AutoCare?

                                </span>

                                {" "}

                                <Link
                                    to="/register"
                                    className="fw-semibold text-decoration-none"
                                >

                                    Join AutoCare

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;