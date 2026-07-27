import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import userService from "../../services/userService";

function Profile() {

    const [profile, setProfile] = useState({

        fullName: "",
        email: "",
        role: "",
        createdAt: ""

    });

    const [passwordData, setPasswordData] = useState({

        currentPassword: "",
        newPassword: "",
        confirmPassword: ""

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await userService.getProfile();

            setProfile(response.data);

        } catch (error) {

            toast.error("Failed to load profile.");

        } finally {

            setLoading(false);

        }

    };

    const handleProfileChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handlePasswordChange = (e) => {

        setPasswordData({

            ...passwordData,

            [e.target.name]: e.target.value

        });

    };

    const updateProfile = async (e) => {

        e.preventDefault();

        try {

            await userService.updateProfile({

                fullName: profile.fullName

            });

            toast.success("Profile updated successfully.");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to update profile."

            );

        }

    };

    const changePassword = async (e) => {

        e.preventDefault();

        if (

            passwordData.newPassword !==

            passwordData.confirmPassword

        ) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            await userService.changePassword(passwordData);

            toast.success("Password changed successfully.");

            setPasswordData({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to change password."

            );

        }

    };

    if (loading) {

        return (

            <div className="container py-5">

                <h4>Loading...</h4>

            </div>

        );

    }

    return (

        <div className="container py-5">

            <div className="row">

                <div className="col-lg-6">

                    <div className="card shadow-sm mb-4">

                        <div className="card-header bg-primary text-white">

                            <h5 className="mb-0">

                                My Profile

                            </h5>

                        </div>

                        <div className="card-body">

                            <form onSubmit={updateProfile}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Full Name

                                    </label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        name="fullName"

                                        value={profile.fullName}

                                        onChange={handleProfileChange}

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input

                                        type="email"

                                        className="form-control"

                                        value={profile.email}

                                        disabled

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Role

                                    </label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        value={profile.role}

                                        disabled

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Account Created

                                    </label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        value={new Date(profile.createdAt).toLocaleString()}

                                        disabled

                                    />

                                </div>

                                <button

                                    className="btn btn-primary"

                                >

                                    Update Profile

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow-sm">

                        <div className="card-header bg-warning">

                            <h5 className="mb-0">

                                Change Password

                            </h5>

                        </div>

                        <div className="card-body">

                            <form onSubmit={changePassword}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Current Password

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="currentPassword"

                                        value={passwordData.currentPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        New Password

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="newPassword"

                                        value={passwordData.newPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Confirm Password

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="confirmPassword"

                                        value={passwordData.confirmPassword}

                                        onChange={handlePasswordChange}

                                    />

                                </div>

                                <button

                                    className="btn btn-warning"

                                >

                                    Change Password

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;