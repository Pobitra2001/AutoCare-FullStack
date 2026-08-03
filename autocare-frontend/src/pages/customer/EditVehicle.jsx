import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VehicleForm from "../../components/forms/VehicleForm";
import vehicleService from "../../services/vehicleService";

const EditVehicle = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadVehicle();
    }, []);

    const loadVehicle = async () => {

        try {

            const response = await vehicleService.getMyVehicleById(id);

            setVehicle(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load vehicle.");

            navigate("/customer/vehicles");

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (vehicleData) => {

        try {

            setSaving(true);

            await vehicleService.updateVehicle(id, vehicleData);

            alert("Vehicle updated successfully.");

            navigate("/customer/vehicles");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update vehicle."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <h4>Loading Vehicle...</h4>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning">

                    <h3 className="mb-0">

                        Edit Vehicle

                    </h3>

                </div>

                <div className="card-body">

                    <VehicleForm
                        initialData={vehicle}
                        onSubmit={handleSubmit}
                        loading={saving}
                    />

                </div>

            </div>

        </div>

    );

};

export default EditVehicle;