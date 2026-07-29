import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import vehicleService from "../../services/vehicleService";

const MyVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {

        try {

            const response = await vehicleService.getMyVehicles();

            setVehicles(response.data);

        } catch (error) {

            console.error("Failed to load vehicles", error);

            alert("Unable to load vehicles.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this vehicle?"
        );

        if (!confirmDelete) return;

        try {

            await vehicleService.deleteVehicle(id);

            setVehicles(
                vehicles.filter(vehicle => vehicle.id !== id)
            );

            alert("Vehicle deleted successfully.");

        } catch (error) {

            console.error(error);

            alert("Failed to delete vehicle.");

        }

    };

    if (loading) {

        return (
            <div className="container mt-5 text-center">
                <h4>Loading Vehicles...</h4>
            </div>
        );

    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>My Vehicles</h2>

                <Link
                    to="/customer/vehicles/add"
                    className="btn btn-primary"
                >
                    + Add Vehicle
                </Link>

            </div>

            {

                vehicles.length === 0 ?

                    (

                        <div className="alert alert-info">

                            You haven't added any vehicles yet.

                        </div>

                    )

                    :

                    (

                        <div className="row">

                            {

                                vehicles.map(vehicle => (

                                    <div
                                        key={vehicle.id}
                                        className="col-md-6 col-lg-4 mb-4"
                                    >

                                        <div className="card shadow h-100">

                                            <div className="card-body">

                                                <h5 className="card-title">

                                                    {vehicle.brand} {vehicle.model}

                                                </h5>

                                                <hr />

                                                <p>

                                                    <strong>Vehicle No:</strong>

                                                    <br />

                                                    {vehicle.vehicleNumber}

                                                </p>

                                                <p>

                                                    <strong>Type:</strong>

                                                    <br />

                                                    {vehicle.vehicleType}

                                                </p>

                                                <p>

                                                    <strong>Fuel:</strong>

                                                    <br />

                                                    {vehicle.fuelType}

                                                </p>

                                                <p>

                                                    <strong>Color:</strong>

                                                    <br />

                                                    {vehicle.color}

                                                </p>

                                                <p>

                                                    <strong>Manufacturing Year:</strong>

                                                    <br />

                                                    {vehicle.manufacturingYear}

                                                </p>

                                            </div>

                                            <div className="card-footer bg-white">

                                                <div className="d-flex justify-content-between">

                                                    <Link
                                                        to={`/customer/vehicles/edit/${vehicle.id}`}
                                                        className="btn btn-warning btn-sm"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(vehicle.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

};

export default MyVehicles;