import api from "./api";

const vehicleService = {

    // ===========================
    // CUSTOMER
    // ===========================

    // Get logged-in customer's vehicles
    getMyVehicles() {
        return api.get("/vehicles/my");
    },

    // Add new vehicle
    createVehicle(vehicle) {
        return api.post("/vehicles", vehicle);
    },

    // Update own vehicle
    updateVehicle(id, vehicle) {
        return api.put(`/vehicles/${id}`, vehicle);
    },

    // Delete own vehicle
    deleteVehicle(id) {
        return api.delete(`/vehicles/${id}`);
    },

    // ===========================
    // ADMIN / STAFF
    // ===========================

    // Get all vehicles
    getAllVehicles() {
        return api.get("/vehicles");
    },

    // Get vehicle by id
    getVehicleById(id) {
        return api.get(`/vehicles/${id}`);
    }

};

export default vehicleService;