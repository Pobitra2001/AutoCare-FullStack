import { Link } from "react-router-dom";
import {
    FaOilCan,
    FaCarBattery,
    FaSnowflake,
    FaTools,
    FaCarCrash,
    FaCogs,
    FaWrench,
    FaCarSide
} from "react-icons/fa";

import "../../assets/styles/services.css";

function Services() {

    const services = [
        {
            icon: <FaOilCan />,
            title: "Oil Change",
            description:
                "Keep your engine healthy with premium engine oil and filter replacement."
        },
        {
            icon: <FaTools />,
            title: "Engine Repair",
            description:
                "Complete engine diagnostics and repair by experienced technicians."
        },
        {
            icon: <FaCarCrash />,
            title: "Brake Service",
            description:
                "Brake pad replacement, inspection and complete braking system maintenance."
        },
        {
            icon: <FaSnowflake />,
            title: "AC Service",
            description:
                "Air conditioner gas refill, cleaning and cooling performance optimization."
        },
        {
            icon: <FaCarSide />,
            title: "Wheel Alignment",
            description:
                "Precision wheel alignment for better mileage and smoother driving."
        },
        {
            icon: <FaCarBattery />,
            title: "Battery Replacement",
            description:
                "Battery health check and genuine battery replacement services."
        },
        {
            icon: <FaCogs />,
            title: "Transmission Service",
            description:
                "Professional transmission inspection, repair and maintenance."
        },
        {
            icon: <FaWrench />,
            title: "General Inspection",
            description:
                "Complete multi-point vehicle inspection to ensure maximum safety."
        }
    ];

    return (

        <div className="services-page">

            {/* Hero Section */}

            <section className="services-hero d-flex align-items-center text-white">

                <div className="container text-center">

                    <h1 className="display-3 fw-bold mb-3">
                        Our Services
                    </h1>

                    <p className="lead mb-4">
                        Professional vehicle maintenance and repair services under one roof.
                    </p>

                    <nav>

                        <Link
                            to="/"
                            className="text-white text-decoration-none"
                        >
                            Home
                        </Link>

                        <span className="mx-2">/</span>

                        <span className="text-warning">
                            Services
                        </span>

                    </nav>

                </div>

            </section>

            {/* Services */}

            <section className="services-section">

                <div className="container">

                    <div className="section-header">

                        <span>OUR SERVICES</span>

                        <h2>
                            Premium AutoCare Solutions
                        </h2>

                        <p>
                            We provide complete vehicle servicing, maintenance,
                            diagnostics and repair solutions with experienced
                            technicians and genuine spare parts.
                        </p>

                    </div>

                    <div className="row g-4">

                        {services.map((service, index) => (

                            <div
                                className="col-lg-3 col-md-6"
                                key={index}
                            >

                                <div className="service-card">

                                    <div className="service-icon">
                                        {service.icon}
                                    </div>

                                    <h4>
                                        {service.title}
                                    </h4>

                                    <p>
                                        {service.description}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* Service Process */}

            <section className="service-process py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            How Our Service Works
                        </h2>

                        <p className="text-muted">
                            Get your vehicle serviced in four simple steps.
                        </p>

                    </div>

                    <div className="row g-4 text-center">

                        <div className="col-md-3">

                            <div className="process-card">

                                <div className="process-number">
                                    1
                                </div>

                                <h5 className="mt-4">
                                    Book Service
                                </h5>

                                <p>
                                    Schedule your preferred vehicle service online.
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="process-card">

                                <div className="process-number">
                                    2
                                </div>

                                <h5 className="mt-4">
                                    Vehicle Inspection
                                </h5>

                                <p>
                                    Our certified technicians inspect your vehicle carefully.
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="process-card">

                                <div className="process-number">
                                    3
                                </div>

                                <h5 className="mt-4">
                                    Repair & Service
                                </h5>

                                <p>
                                    Required maintenance and repairs are completed using genuine parts.
                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="process-card">

                                <div className="process-number">
                                    4
                                </div>

                                <h5 className="mt-4">
                                    Ready to Drive
                                </h5>

                                <p>
                                    Collect your vehicle with a digital invoice and service report.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Call To Action */}

            <section className="py-5 bg-primary text-white">

                <div className="container text-center">

                    <h2 className="fw-bold mb-3">
                        Ready to Give Your Vehicle the Best Care?
                    </h2>

                    <p className="lead mb-4">
                        Book your vehicle service today and experience reliable,
                        transparent and professional automobile maintenance.
                    </p>

                    <Link
                        to="/contact"
                        className="btn btn-light btn-lg px-5"
                    >
                        Book Service Now
                    </Link>

                </div>

            </section>

            {/* FAQ */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">

                            Frequently Asked Questions

                        </h2>

                        <p className="text-muted">

                            Everything you need to know about our vehicle servicing.

                        </p>

                    </div>

                    <div className="accordion" id="faqAccordion">

                        <div className="accordion-item">

                            <h2 className="accordion-header">

                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq1"
                                >

                                    How often should I service my vehicle?

                                </button>

                            </h2>

                            <div
                                id="faq1"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#faqAccordion"
                            >

                                <div className="accordion-body">

                                    We recommend servicing your vehicle every
                                    5,000–10,000 km depending on the manufacturer.

                                </div>

                            </div>

                        </div>

                        <div className="accordion-item">

                            <h2 className="accordion-header">

                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq2"
                                >

                                    Do you use genuine spare parts?

                                </button>

                            </h2>

                            <div
                                id="faq2"
                                className="accordion-collapse collapse"
                                data-bs-parent="#faqAccordion"
                            >

                                <div className="accordion-body">

                                    Yes. We only use genuine or OEM-approved spare
                                    parts to ensure safety and reliability.

                                </div>

                            </div>

                        </div>

                        <div className="accordion-item">

                            <h2 className="accordion-header">

                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq3"
                                >

                                    Can I track my vehicle service?

                                </button>

                            </h2>

                            <div
                                id="faq3"
                                className="accordion-collapse collapse"
                                data-bs-parent="#faqAccordion"
                            >

                                <div className="accordion-body">

                                    Yes. AutoCare provides real-time service status
                                    updates through your dashboard.

                                </div>

                            </div>

                        </div>

                        <div className="accordion-item">

                            <h2 className="accordion-header">

                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq4"
                                >

                                    Do I receive a digital invoice?

                                </button>

                            </h2>

                            <div
                                id="faq4"
                                className="accordion-collapse collapse"
                                data-bs-parent="#faqAccordion"
                            >

                                <div className="accordion-body">

                                    Absolutely. Every completed service includes a
                                    downloadable digital invoice and service history.

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Services;