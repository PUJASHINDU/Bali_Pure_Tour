import React, { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Typography, Button } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import userDefaultImg from "../../assets/icon/profile.jpg";

const ProfileComponent = () => {
  const { adminData, fetchAdminData, logout, admin } = useAuth();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const photoProfile = admin?.photo_profile || userDefaultImg;

  const handleSave = async () => {
    try {
      await updateProfile({ photo_profile: photoProfile });
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-start space-y-6 bg-gray-50 p-6 rounded-lg shadow-lg">
      <Typography variant="h4" color="blue-gray" className="font-poppins font-semibold">
        Profile Information
      </Typography>
      <Typography variant="small" className="text-gray-600 font-poppins mb-1 -mt-14">
        Informasi akun admin yang sedang login.
      </Typography>

      <div className="flex items-center space-x-4">
        <img
          src={photoProfile}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
        />
        <div>
          <Typography variant="h6" className="text-gray-800 font-poppins font-semibold">
            {adminData?.name || "Admin"}
          </Typography>
          <Typography variant="small" className="text-gray-600 font-poppins">
            {adminData?.email || "Email tidak tersedia"}
          </Typography>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button onClick={handleSave} className="bg-green-500 flex items-center px-6 py-2 font-poppins text-sm font-medium shadow-md hover:bg-green-600">
          <FiEdit className="mr-2" /> Save Update
        </Button>
        <Button onClick={logout} className="bg-red-500 flex items-center px-6 py-2 font-poppins text-sm font-medium shadow-md hover:bg-red-600">
          <AiOutlineLogout className="mr-2" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileComponent;
