import api from "./api";

const userService = {

    // Get logged-in user profile
    getProfile() {
        return api.get("/users/profile");
    },

    // Update profile
    updateProfile(profile) {
        return api.put("/users/profile", profile);
    },

    // Change password
    changePassword(passwordData) {
        return api.put("/users/change-password", passwordData);
    }

};

export default userService;