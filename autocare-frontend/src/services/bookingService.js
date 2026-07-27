import api from "./api";

const bookingService = {

    // ==========================
    // Customer
    // ==========================

    getMyBookings() {
        return api.get("/bookings/my-bookings");
    },

    createBooking(booking) {
        return api.post("/bookings", booking);
    },

    // ==========================
    // Admin / Staff
    // ==========================

    getAllBookings() {
        return api.get("/bookings");
    },

    getBookingById(id) {
        return api.get(`/bookings/${id}`);
    },

    updateBookingStatus(id, status) {
        return api.put(
            `/bookings/${id}/status?status=${status}`
        );
    },

    deleteBooking(id) {
        return api.delete(`/bookings/${id}`);
    },

    getBookingsByStatus(status) {
        return api.get(`/bookings/status/${status}`);
    }

};

export default bookingService;