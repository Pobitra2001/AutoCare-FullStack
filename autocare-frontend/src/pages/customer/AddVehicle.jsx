import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VehicleForm from "../../components/forms/VehicleForm";
import vehicleService from "../../services/vehicleService";

const AddVehicle = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (vehicleData) => {

        try {

            setLoading(true);

            await vehicleService.createVehicle(vehicleData);

            alert("Vehicle added successfully.");

            navigate("/customer/vehicles");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add vehicle."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">
                        Add Vehicle
                    </h3>

                </div>

                <div className="card-body">

                    <VehicleForm
                        onSubmit={handleSubmit}
                        loading={loading}
                    />

                </div>

            </div>

        </div>

    );

};

export default AddVehicle;