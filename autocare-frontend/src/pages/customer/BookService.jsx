import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import bookingService from "../../services/bookingService";

function BookService() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const serviceTypes = [
        "GENERAL_SERVICE",
        "OIL_CHANGE",
        "ENGINE_REPAIR",
        "BRAKE_SERVICE",
        "BATTERY_REPLACEMENT",
        "WHEEL_ALIGNMENT",
        "AC_SERVICE",
        "CAR_WASH"
    ];

    const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState({

       phone: "",

       vehicleNumber: "",

       vehicleModel: "",

       serviceType: "",

       bookingDate: "",

       notes: ""

   });
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]:
                name === "vehicleNumber"
                    ? value.toUpperCase()
                    : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.phone.trim()) {

            toast.error("Phone number is required.");

            return;

        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {

            toast.error("Enter a valid 10-digit phone number.");

            return;

        }

        if (!formData.vehicleNumber.trim()) {

            toast.error("Vehicle number is required.");

            return;

        }

        if (!formData.vehicleModel.trim()) {

            toast.error("Vehicle model is required.");

            return;

        }

        if (!formData.serviceType) {

            toast.error("Please select a service type.");

            return;

        }

        if (!formData.bookingDate) {

            toast.error("Please select a booking date.");

            return;

        }

        try {

            setLoading(true);

            await bookingService.createBooking({
                phone: formData.phone,
                vehicleNumber: formData.vehicleNumber,
                vehicleModel: formData.vehicleModel,
                serviceType: formData.serviceType,
                bookingDate: formData.bookingDate,
                notes: formData.notes
            });

            toast.success("Service booked successfully.");

            setTimeout(() => {

                navigate("/customer/bookings");

            }, 1200);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Booking failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">

                                    Book Vehicle Service

                                </h2>

                                <p className="text-muted">

                                    Schedule your vehicle service in just a few
                                    simple steps.

                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Customer Name

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.customerName}
                                            disabled
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Email Address

                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            disabled
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Phone Number

                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            maxLength={10}
                                            pattern="[0-9]{10}"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Vehicle Number

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="vehicleNumber"
                                            placeholder="WB34AB1234"
                                            style={{ textTransform: "uppercase" }}
                                            value={formData.vehicleNumber}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">

                                            Vehicle Model

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="vehicleModel"
                                            placeholder="Honda City"
                                            value={formData.vehicleModel}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>
                       <div className="col-md-6 mb-3">

      <label className="form-label">
           Service Type

                                                                                                                  </label>

                                                                                                                  <select
                                                                                                                      className="form-select"
                                                                                                                      name="serviceType"
                                                                                                                      value={formData.serviceType}
                                                                                                                      onChange={handleChange}
                                                                                                                      required
                                                                                                                  >

                                                                                                                      <option value="">

                                                                                                                          Select Service

                                                                                                                      </option>

                                                                                                                      {

                                                                                                                          serviceTypes.map((service) => (

                                                                                                                              <option
                                                                                                                                  key={service}
                                                                                                                                  value={service}
                                                                                                                              >

                                                                                                                                  {

                                                                                                                                      service
                                                                                                                                          .replaceAll("_", " ")
                                                                                                                                          .toLowerCase()
                                                                                                                                          .replace(/\b\w/g, c => c.toUpperCase())

                                                                                                                                  }

                                                                                                                              </option>

                                                                                                                          ))

                                                                                                                      }

                                                                                                                  </select>

                                                                                                              </div>

                                                                                                          </div>

                                                                                                          <div className="mb-3">

                                                                                                              <label className="form-label">

                                                                                                                  Preferred Booking Date

                                                                                                              </label>

                                                                                                              <input
                                                                                                                  type="date"
                                                                                                                  className="form-control"
                                                                                                                  name="bookingDate"
                                                                                                                  value={formData.bookingDate}
                                                                                                                  min={new Date().toISOString().split("T")[0]}
                                                                                                                  onChange={handleChange}
                                                                                                                  required
                                                                                                              />

                                                                                                          </div>

                                                                                                          <div className="mb-4">

                                                                                                              <label className="form-label">

                                                                                                                  Additional Notes

                                                                                                              </label>

                                                                                                              <textarea
                                                                                                                  rows="5"
                                                                                                                  className="form-control"
                                                                                                                  name="notes"
                                                                                                                  placeholder="Describe your vehicle problem (optional)"
                                                                                                                  value={formData.notes}
                                                                                                                  onChange={handleChange}
                                                                                                              />

                                                                                                          </div>

                                                                                                          <div className="d-flex gap-3">

                                                                                                              <button
                                                                                                                  type="submit"
                                                                                                                  className="btn btn-primary flex-fill py-2"
                                                                                                                  disabled={loading}
                                                                                                              >

                                                                                                                  {

                                                                                                                      loading

                                                                                                                          ? "Booking Service..."

                                                                                                                          : "Book Service"

                                                                                                                  }

                                                                                                              </button>

                                                                                                              <button
                                                                                                                  type="button"
                                                                                                                  className="btn btn-outline-secondary"
                                                                                                                  onClick={() => navigate("/customer/dashboard")}
                                                                                                              >

                                                                                                                  Cancel

                                                                                                              </button>

                                                                                                          </div>

                                                                                                      </form>

                                                                                                  </div>

                                                                                              </div>

                                                                                          </div>

                                                                                      </div>

                                                                                  </div>

                                                                              );

                                                                          }

                                                                          export default BookService;


