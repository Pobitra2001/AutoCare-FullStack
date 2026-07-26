import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock
} from "react-icons/fa";

import "../../assets/styles/contact.css";

import contactMessageService from "../../services/contactMessageService";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

           await contactMessageService.createMessage(formData);

            alert("Message sent successfully!");

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        }

        catch (error) {

            console.error(error);

            alert("Unable to send message.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            {/* Hero */}

            <section className="contact-hero">

                <div className="container">

                    <h1>

                        Contact Us

                    </h1>

                    <p className="mt-3">

                        We'd love to hear from you. Get in touch with our team.

                    </p>

                    <nav className="mt-4">

                        <Link
                            to="/"
                            className="text-white text-decoration-none"
                        >
                            Home
                        </Link>

                        <span className="mx-2">

                            /

                        </span>

                        <span className="text-warning">

                            Contact

                        </span>

                    </nav>

                </div>

            </section>

            {/* Contact Information */}

            <section className="contact-info">

                <div className="container">

                    <div className="row g-4">

                        <div className="col-md-3">

                            <div className="contact-card">

                                <div className="contact-icon">

                                    <FaMapMarkerAlt />

                                </div>

                                <h5>

                                    Address

                                </h5>

                                <p className="text-muted">

                                    Kolkata, West Bengal, India

                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="contact-card">

                                <div className="contact-icon">

                                    <FaPhoneAlt />

                                </div>

                                <h5>

                                    Phone

                                </h5>

                                <p className="text-muted">

                                    +91 98765 43210

                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="contact-card">

                                <div className="contact-icon">

                                    <FaEnvelope />

                                </div>

                                <h5>

                                    Email

                                </h5>

                                <p className="text-muted">

                                    support@autocare.com

                                </p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="contact-card">

                                <div className="contact-icon">

                                    <FaClock />

                                </div>

                                <h5>

                                    Working Hours

                                </h5>

                                <p className="text-muted">

                                    Mon - Sat

                                    <br />

                                    9:00 AM - 7:00 PM

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Contact Form */}

            <section className="contact-form-section">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-8">

                            <div className="contact-form">

                                <h2 className="mb-4 text-center">

                                    Send Us A Message

                                </h2>

                                <form onSubmit={handleSubmit}>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Your Email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <textarea
                                            rows="6"
                                            className="form-control"
                                            placeholder="Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >

                                        {
                                            loading
                                                ? "Sending..."
                                                : "Send Message"
                                        }

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Google Map */}

            <section className="contact-map">

                <div className="container">

                    <iframe
                        title="AutoCare Location"
                        src="https://www.google.com/maps?q=Kolkata,West%20Bengal&output=embed"
                        loading="lazy"
                    ></iframe>

                </div>

            </section>

            {/* Business Hours */}

            <section className="business-hours">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-8">

                            <div className="hours-card">

                                <h2 className="text-center mb-4">

                                    Business Hours

                                </h2>

                                <ul>

                                    <li>

                                        <span>

                                            Monday

                                        </span>

                                        <span>

                                            9:00 AM - 7:00 PM

                                        </span>

                                    </li>

                                    <li>

                                        <span>

                                            Tuesday

                                        </span>

                                        <span>

                                            9:00 AM - 7:00 PM

                                        </span>

                                    </li>

                                    <li>

                                        <span>

                                            Wednesday

                                        </span>

                                        <span>

                                            9:00 AM - 7:00 PM

                                        </span>

                                    </li>

                                    <li>

                                        <span>

                                            Thursday

                                        </span>

                                        <span>

                                            9:00 AM - 7:00 PM

                                        </span>

                                    </li>

                                    <li>

                                        <span>

                                            Friday

                                        </span>

                                        <span>

                                            9:00 AM - 7:00 PM

                                        </span>

                                    </li>

                                    <li>

                                        <span>

                                            Saturday

                                        </span>

                                        <span>

                                            9:00 AM - 5:00 PM

                                        </span>

                                    </li>

                                    <li>

                                        <span>

                                            Sunday

                                        </span>

                                        <span className="text-danger">

                                            Closed

                                        </span>

                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </>

    );

}

export default Contact;