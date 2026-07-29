import { useEffect, useState } from "react";

const VehicleForm = ({ initialData, onSubmit, loading }) => {

    const [formData, setFormData] = useState({
        vehicleNumber: "",
        brand: "",
        model: "",
        color: "",
        vehicleType: "CAR",
        fuelType: "PETROL",
        manufacturingYear: ""
    });

    useEffect(() => {

        if (initialData) {

            setFormData({
                vehicleNumber: initialData.vehicleNumber || "",
                brand: initialData.brand || "",
                model: initialData.model || "",
                color: initialData.color || "",
                vehicleType: initialData.vehicleType || "CAR",
                fuelType: initialData.fuelType || "PETROL",
                manufacturingYear: initialData.manufacturingYear || ""
            });

        }

    }, [initialData]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <form onSubmit={handleSubmit}>

            {/* Vehicle Number */}

            <div className="mb-3">

                <label className="form-label">
                    Vehicle Number
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="WB34AB1234"
                    required
                />

            </div>

            {/* Brand */}

            <div className="mb-3">

                <label className="form-label">
                    Brand
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Hyundai"
                    required
                />

            </div>

            {/* Model */}

            <div className="mb-3">

                <label className="form-label">
                    Model
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="i20"
                    required
                />

            </div>

            {/* Color */}

            <div className="mb-3">

                <label className="form-label">
                    Color
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="White"
                    required
                />

            </div>

            {/* Vehicle Type */}

            <div className="mb-3">

                <label className="form-label">
                    Vehicle Type
                </label>

                <select
                    className="form-select"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                >

                    <option value="CAR">Car</option>
                    <option value="BIKE">Bike</option>
                    <option value="SCOOTER">Scooter</option>

                </select>

            </div>

            {/* Fuel Type */}

            <div className="mb-3">

                <label className="form-label">
                    Fuel Type
                </label>

                <select
                    className="form-select"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                >

                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="ELECTRIC">Electric</option>

                </select>

            </div>

            {/* Manufacturing Year */}

            <div className="mb-4">

                <label className="form-label">
                    Manufacturing Year
                </label>

                <input
                    type="number"
                    className="form-control"
                    name="manufacturingYear"
                    value={formData.manufacturingYear}
                    onChange={handleChange}
                    placeholder="2023"
                    required
                />

            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
            >

                {
                    loading
                        ? "Saving..."
                        : "Save Vehicle"
                }

            </button>

        </form>

    );

};

export default VehicleForm;