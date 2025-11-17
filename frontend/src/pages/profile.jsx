import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  getCurrentUserProfile,
} from "../services/getUserDetails";
import {
  User,
  EnvelopeSimple,
  CalendarBlank,
  MapPin,
  CircleNotch,
  WarningCircle,
  UserCircle,
  Clock,
  Target,
  Fire,
  CheckCircle,
} from "phosphor-react";
import NavBar from "../components/NavBar";
import { useAuth } from "../store/AuthContext";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { username } = useParams();

  const { user, loading: authLoading } = useAuth();

  console.log("+++ : user : ", user);
  const currentUsername = user?.username;

  const fetchUserInfos = async () => {
    if (authLoading) return;

    if (!username) {
      setLoading(false);
      setError("Invalide Profile Path.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let data;

      if (currentUsername && username === currentUsername) {
        data = await getCurrentUserProfile();
      } else {
        data = await getUserProfile(username);
      }

      setUserData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfos();
  }, [username, currentUsername, authLoading]);

  // Loading State
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <CircleNotch
              weight="bold"
              className="w-12 h-12 text-gray-900 animate-spin mx-auto mb-4"
            />
            <p className="text-gray-600 text-lg">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  // Error State
  if (error) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center bg-gray-50 border border-red-200 rounded-xl p-8 max-w-md">
            <WarningCircle
              weight="duotone"
              className="w-16 h-16 text-red-500 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </>
    );
  }

  // No Data State
  if (!userData) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <UserCircle
              weight="duotone"
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
            />
            <p className="text-gray-600 text-lg">No user data found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Profile
            </h1>
            <p className="text-gray-600">
              View user information and statistics
            </p>
          </div>

          {/* Profile Header Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg">
                  <User weight="duotone" className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-md"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userData.firstname} {userData.lastname}
                </h1>
                <p className="text-gray-600 text-lg mb-4">@{username}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Target
                        weight="duotone"
                        className="w-4 h-4 text-gray-600"
                      />
                      <p className="text-gray-600 text-sm font-medium">
                        Habits
                      </p>
                    </div>
                    <p className="text-gray-900 text-xl font-bold">12</p>
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Fire
                        weight="duotone"
                        className="w-4 h-4 text-orange-500"
                      />
                      <p className="text-gray-600 text-sm font-medium">
                        Streak
                      </p>
                    </div>
                    <p className="text-gray-900 text-xl font-bold">7 days</p>
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle
                        weight="duotone"
                        className="w-4 h-4 text-green-500"
                      />
                      <p className="text-gray-600 text-sm font-medium">
                        Completed
                      </p>
                    </div>
                    <p className="text-gray-900 text-xl font-bold">85%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <EnvelopeSimple className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Contact Information
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <EnvelopeSimple
                    weight="duotone"
                    className="w-5 h-5 text-gray-600 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Email
                    </p>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                </div>
                {userData.phone && (
                  <div className="flex items-start gap-3">
                    <Clock
                      weight="duotone"
                      className="w-5 h-5 text-gray-600 mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </p>
                      <p className="text-gray-900">{userData.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <CalendarBlank className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Details
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarBlank
                    weight="duotone"
                    className="w-5 h-5 text-gray-600 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Member Since
                    </p>
                    <p className="text-gray-900">
                      {userData.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
                {userData.location && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      weight="duotone"
                      className="w-5 h-5 text-gray-600 mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Location
                      </p>
                      <p className="text-gray-900">{userData.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {userData.bio && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
