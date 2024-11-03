import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {message, notification} from "antd";
import {doUpdateUserInfoAction} from "../../redux/account/accountSlice.js";
import {callChangePassword, callUpdateProfile} from "../../services/api.js"; // Redux hooks

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, isAuthenticated } = useSelector((state) => state.account);

    // Local state for tabs
    const [activeTab, setActiveTab] = useState("profile");
    const [profileData, setProfileData] = useState({
        id: user.id,
        name: user?.name || "",
        email: user?.email || "",
        firstName: user?.firstName || "",
    });
    const [passwordData, setPasswordData] = useState({
        id: user?.id,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Handlers for switching tabs
    const handleTabSwitch = (tab) => setActiveTab(tab);

    // Handle profile update
    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!profileData.name || !profileData.firstName) { // Validate required fields
            message.error("Please fill in all fields");
            return;
        }

        try {
            // Call the API to update profile
            await callUpdateProfile(profileData);
            // Dispatch Redux action to update the store (optional)
            dispatch(doUpdateUserInfoAction(profileData));
            message.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            message.error("Failed to update profile");
        }
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();



        if (!passwordData.confirmPassword || !passwordData.newPassword || !passwordData.confirmPassword) { // Validate required fields
            message.error("Please fill in all fields");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }
        try {
            const res = await callChangePassword(passwordData);

            if(res?.data) {
                message.success("Password updated successfully!");
            }else{
                notification.error({
                    message: 'Đã có lỗi xảy ra',
                    description: res.message
                })
            }

        } catch (error){
            console.error("Error updating change password:", error);
            message.error("Failed to update password");
        }

    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {isAuthenticated && (
                <div className="container mx-auto px-4 py-8">
                    {/* Tabs Navigation */}
                    <div className="flex justify-center mb-4">
                        <button
                            className={`px-4 py-2 mx-2 ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                            onClick={() => handleTabSwitch("profile")}
                        >
                            Edit Profile
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 ${activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                            onClick={() => handleTabSwitch("password")}
                        >
                            Change Password
                        </button>
                    </div>

                    {/* Tabs Content */}
                    <div className="border p-4 rounded-lg bg-white">
                        {activeTab === "profile" ? (
                            <form onSubmit={handleProfileSubmit}>
                                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                                <div className="mb-4">
                                    <label className="block text-gray-700">First name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={profileData.firstName}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700">Last name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        disabled
                                        onChange={handleProfileChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handlePasswordSubmit}>
                                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Change Password
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;
