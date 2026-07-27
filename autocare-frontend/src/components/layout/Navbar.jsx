import { NavLink } from "react-router-dom";

import "../../assets/styles/navbar.css";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg sticky-top">

            <div className="container">

                <NavLink className="navbar-brand logo" to="/">

                    AutoCare

                </NavLink>

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

                <div className="collapse navbar-collapse" id="menu">

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/">

                                Home

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/about">

                                About

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/services">

                                Services

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink className="nav-link" to="/contact">

                                Contact

                            </NavLink>

                        </li>

                        <li className="nav-item ms-3">

                            <NavLink
                                className="nav-link btn-register"
                                to="/register"
                            >

                                Join AutoCare

                            </NavLink>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;