import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/autocare-logo.svg";

import "../../assets/styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [showDropdown, setShowDropdown] = useState(false);

    // ==============================
    // GET FIRST NAME
    // ==============================

    const getFirstName = () => {

        if (!user) {
            return "";
        }

        const name = user.fullName || user.name || "";

        return name.split(" ")[0];

    };

    // ==============================
    // GO TO DASHBOARD
    // ==============================

    const handleProfile = () => {

        if (!user) {
            return;
        }

        setShowDropdown(false);

        const role = user.role;

        if (role === "CUSTOMER") {

            navigate("/customer/dashboard");

        } else if (role === "ADMIN") {

            navigate("/admin/dashboard");

        } else if (role === "STAFF") {

            navigate("/staff/dashboard");

        } else {

            navigate("/");

        }

    };

    // ==============================
    // LOGOUT
    // ==============================

    const handleLogout = () => {

        logout();

        setShowDropdown(false);

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg sticky-top">

            <div className="container">

                {/* ==============================
                    LOGO
                ============================== */}

                <NavLink
                    className="navbar-brand logo"
                    to="/"
                >

                   <img src={logo} alt="AutoCare" />

                </NavLink>


                {/* ==============================
                    MOBILE TOGGLE
                ============================== */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                {/* ==============================
                    NAVIGATION
                ============================== */}

                <div
                    className="collapse navbar-collapse"
                    id="menu"
                >

                    <ul className="navbar-nav ms-auto align-items-center">


                        {/* HOME */}

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/"
                            >

                                Home

                            </NavLink>

                        </li>


                        {/* ABOUT */}

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/about"
                            >

                                About

                            </NavLink>

                        </li>


                        {/* SERVICES */}

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/services"
                            >

                                Services

                            </NavLink>

                        </li>


                        {/* CONTACT */}

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/contact"
                            >

                                Contact

                            </NavLink>

                        </li>


                        {/* ==============================
                            GUEST
                        ============================== */}

                        {!user && (

                            <li className="nav-item ms-3">

                                <NavLink
                                    className="nav-link btn-register"
                                    to="/register"
                                >

                                    Join AutoCare

                                </NavLink>

                            </li>

                        )}


                        {/* ==============================
                            LOGGED-IN USER
                        ============================== */}

                        {user && (

                            <li className="nav-item ms-3">

                                <div className="profile-dropdown">


                                    {/* USER BUTTON */}

                                    <button
                                        type="button"
                                        className="profile-button"
                                        onClick={() =>
                                            setShowDropdown(
                                                !showDropdown
                                            )
                                        }
                                    >

                                        <span className="profile-icon">

                                            👤

                                        </span>

                                        <span>

                                            {getFirstName()}

                                        </span>

                                        <span className="dropdown-arrow">

                                            ▾

                                        </span>

                                    </button>


                                    {/* DROPDOWN */}

                                    {showDropdown && (

                                        <div className="profile-menu">


                                            {/* USER NAME */}

                                            <div className="profile-menu-header">

                                                <span className="profile-menu-icon">

                                                    👤

                                                </span>

                                                <span>

                                                    {getFirstName()}

                                                </span>

                                            </div>


                                            <div className="dropdown-divider"></div>


                                            {/* YOUR PROFILE */}

                                            <button
                                                type="button"
                                                className="profile-menu-item"
                                                onClick={handleProfile}
                                            >

                                                <span>

                                                    🏠

                                                </span>

                                                <span>

                                                    Your Profile

                                                </span>

                                            </button>


                                            {/* LOGOUT */}

                                            <button
                                                type="button"
                                                className="profile-menu-item logout-item"
                                                onClick={handleLogout}
                                            >

                                                <span>

                                                    🚪

                                                </span>

                                                <span>

                                                    Logout

                                                </span>

                                            </button>

                                        </div>

                                    )}

                                </div>

                            </li>

                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;