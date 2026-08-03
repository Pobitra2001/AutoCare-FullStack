import api from "./api";

const vehicleService = {

    // ===========================
    // CUSTOMER
    // ===========================

    // Get logged-in customer's vehicles
    getMyVehicles() {
        return api.get("/vehicles/my");
    },

    // Get one logged-in customer's vehicle
    getMyVehicleById(id) {
        return api.get(`/vehicles/my/${id}`);
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

    getAllVehicles() {
        return api.get("/vehicles");
    },

    getVehicleById(id) {
        return api.get(`/vehicles/${id}`);
    }

};

export default vehicleService;