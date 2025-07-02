import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/thunks/authThunks";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen text-xl text-gray-400"
      >
        Loading profile...
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-12 p-8 bg-black text-white rounded-xl shadow-lg border border-gray-700"
    >
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold uppercase">
          {user.name?.[0]}
        </div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-400">{user.email}</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div className="flex justify-between border-b border-gray-700 pb-3">
          <span className="text-gray-400">Last Login:</span>
          <span>{new Date(user.lastLogin).toLocaleString()}</span>
        </div>

        <div className="flex justify-between border-b border-gray-700 pb-3">
          <span className="text-gray-400">Verified:</span>
          <span
            className={`${
              user.isVerified ? "text-green-400" : "text-red-400"
            } font-semibold`}
          >
            {user.isVerified ? "Yes" : "No"}
          </span>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-white text-black rounded-lg shadow-lg hover:bg-gray-300 transition"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
