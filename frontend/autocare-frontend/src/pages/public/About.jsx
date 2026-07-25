import { Link } from "react-router-dom";
import "../../assets/styles/about.css";



function About() {

    return (

        <>



            {/* Hero Section */}

            <section
                className="bg-dark text-white d-flex align-items-center"
                style={{
                    minHeight: "45vh",
                    background:
                        "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url('https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1600&auto=format&fit=crop') center/cover"
                }}
            >

                <div className="container text-center">

                    <h1 className="display-3 fw-bold mb-3">

                        About AutoCare

                    </h1>

                    <p className="lead mb-4">

                        Your Trusted Partner for Reliable Vehicle Maintenance and Repair

                    </p>

                    <nav>

                        <Link
                            to="/"
                            className="text-decoration-none text-white"
                        >
                            Home
                        </Link>

                        <span className="mx-2">/</span>

                        <span className="text-warning">

                            About

                        </span>

                    </nav>

                </div>

            </section>

            {/* About Company */}

            <section className="py-5">

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-6 mb-4">

                            <img

                                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop"

                                alt="AutoCare Garage"

                                className="img-fluid rounded shadow"

                            />

                        </div>

                        <div className="col-lg-6">

                            <h5 className="text-primary fw-bold mb-3">

                                WHO WE ARE

                            </h5>

                            <h2 className="fw-bold mb-4">

                                Professional Vehicle Service Management

                            </h2>

                            <p className="text-muted">

                                AutoCare is a modern vehicle servicing platform
                                dedicated to providing reliable, transparent,
                                and efficient automotive maintenance solutions.

                            </p>

                            <p className="text-muted">

                                We combine experienced technicians with smart
                                digital management to ensure every customer
                                enjoys a hassle-free servicing experience.

                            </p>

                            <p className="text-muted">

                                Whether it's routine maintenance, diagnostics,
                                repairs, or complete servicing, our goal is to
                                keep your vehicle running safely and efficiently.

                            </p>

                            <Link

                                to="/services"

                                className="btn btn-primary mt-3 px-4"

                            >

                                Explore Services

                            </Link>

                        </div>

                    </div>

                </div>

            </section>

                        {/* Mission & Vision */}

                        <section className="py-5 bg-light">

                            <div className="container">

                                <div className="row g-4">

                                    <div className="col-md-6">

                                        <div className="card border-0 shadow h-100">

                                            <div className="card-body p-4">

                                                <div className="mb-3">

                                                    <i className="bi bi-bullseye text-primary fs-1"></i>

                                                </div>

                                                <h3 className="fw-bold">

                                                    Our Mission

                                                </h3>

                                                <p className="text-muted mt-3">

                                                    To simplify vehicle maintenance through
                                                    technology, transparency, and exceptional
                                                    customer service while delivering reliable,
                                                    affordable, and high-quality automotive
                                                    solutions.

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <div className="card border-0 shadow h-100">

                                            <div className="card-body p-4">

                                                <div className="mb-3">

                                                    <i className="bi bi-eye-fill text-success fs-1"></i>

                                                </div>

                                                <h3 className="fw-bold">

                                                    Our Vision

                                                </h3>

                                                <p className="text-muted mt-3">

                                                    To become the most trusted digital
                                                    automobile service platform by combining
                                                    innovation, skilled professionals,
                                                    and customer satisfaction.

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* Why Choose AutoCare */}

                        <section className="py-5">

                            <div className="container">

                                <div className="text-center mb-5">

                                    <h2 className="fw-bold">

                                        Why Choose AutoCare

                                    </h2>

                                    <p className="text-muted">

                                        Delivering Quality Service with Trust and Transparency

                                    </p>

                                </div>

                                <div className="row g-4">

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                                            <i className="bi bi-tools text-primary display-5"></i>

                                            <h5 className="mt-3 fw-bold">

                                                Expert Technicians

                                            </h5>

                                            <p className="text-muted">

                                                Skilled professionals providing high-quality
                                                servicing for every vehicle.

                                            </p>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                                            <i className="bi bi-shield-check text-success display-5"></i>

                                            <h5 className="mt-3 fw-bold">

                                                Genuine Parts

                                            </h5>

                                            <p className="text-muted">

                                                We use authentic spare parts to ensure
                                                long-lasting vehicle performance.

                                            </p>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                                            <i className="bi bi-cash-stack text-warning display-5"></i>

                                            <h5 className="mt-3 fw-bold">

                                                Affordable Pricing

                                            </h5>

                                            <p className="text-muted">

                                                Transparent pricing with no hidden charges.

                                            </p>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                                            <i className="bi bi-speedometer2 text-danger display-5"></i>

                                            <h5 className="mt-3 fw-bold">

                                                Fast Service

                                            </h5>

                                            <p className="text-muted">

                                                Quick turnaround time without compromising
                                                service quality.

                                            </p>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                                            <i className="bi bi-receipt text-info display-5"></i>

                                            <h5 className="mt-3 fw-bold">

                                                Digital Billing

                                            </h5>

                                            <p className="text-muted">

                                                Instant invoices with complete service
                                                transparency.

                                            </p>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                                            <i className="bi bi-emoji-smile text-primary display-5"></i>

                                            <h5 className="mt-3 fw-bold">

                                                Customer Satisfaction

                                            </h5>

                                            <p className="text-muted">

                                                We focus on building long-term trust with
                                                every customer.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* Statistics */}

                        <section className="py-5 bg-primary text-white">

                            <div className="container">

                                <div className="row text-center">

                                    <div className="col-md-3 mb-4">

                                        <h1 className="fw-bold">

                                            1000+

                                        </h1>

                                        <p>

                                            Happy Customers

                                        </p>

                                    </div>

                                    <div className="col-md-3 mb-4">

                                        <h1 className="fw-bold">

                                            500+

                                        </h1>

                                        <p>

                                            Vehicles Serviced

                                        </p>

                                    </div>

                                    <div className="col-md-3 mb-4">

                                        <h1 className="fw-bold">

                                            1500+

                                        </h1>

                                        <p>

                                            Successful Bookings

                                        </p>

                                    </div>

                                    <div className="col-md-3 mb-4">

                                        <h1 className="fw-bold">

                                            98%

                                        </h1>

                                        <p>

                                            Customer Satisfaction

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* Call To Action */}

                        <section className="py-5 bg-dark text-white">

                            <div className="container">

                                <div className="row align-items-center">

                                    <div className="col-lg-8">

                                        <h2 className="fw-bold mb-3">

                                            Ready to Give Your Vehicle the Best Care?

                                        </h2>

                                        <p className="lead text-light">

                                            From routine maintenance to complete vehicle servicing,
                                            AutoCare ensures quality, transparency, and customer
                                            satisfaction every step of the way.

                                        </p>

                                    </div>

                                    <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

                                        <Link
                                            to="/services"
                                            className="btn btn-warning btn-lg px-5 fw-bold"
                                        >

                                            Book Service

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </section>



        </>

    );

}

export default About;