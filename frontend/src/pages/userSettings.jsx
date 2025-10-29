import React, { useState, useEffect } from "react";
import { User, Save, Loader } from "lucide-react";
import NavBar from "../components/NavBar";
import { getUserDetails, updateUserSettings } from "../services/getUserDetails";

const UserSettings = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchUserInfos = async () => {
    try {
      const data = await getUserDetails();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUserInfos();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSettings = async () => {
    setSaving(true);
    try {
      const info = await updateUserSettings(userData);
      setUserData(info);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <div className="max-w-2xl mx-auto m-5">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Settings
          </h1>
          <p className="text-gray-600">Update your profile information</p>
        </div>
        {message && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-center">
            {message}
          </div>
        )}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                id="firstname"
                value={userData.firstname || ""}
                onChange={(e) => handleInputChange("firstname", e.target.value)}
                className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                value={userData?.lastname || ""}
                onChange={(e) => handleInputChange("lastname", e.target.value)}
                className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={userData?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>
            <div className="pt-4">
              <button
                onClick={updateSettings}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
