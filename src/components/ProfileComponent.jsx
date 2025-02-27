import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";
import {
  Input,
  Typography,
  Button,
  Select,
  Option,
  Radio,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import userDefaultImg from "../assets/icon/profile.jpg";


const ProfileComponent = () => {
  const { token, user, setToken } = useAuth();
  console.log(user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoProfile, setPhotoProfile] = useState(user?.photo_profile || userDefaultImg);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    birth_date: user?.birth_date ? user.birth_date.split("T")[0] : "",
    gender: user?.gender === 1 ? "Female" : "Male",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoProfile(imageUrl);
    }
  };

  const handleSubmit = async () => {
    const updatedData = {
      ...formData,
      gender: formData.gender === "Female" ? 1 : 0,
      photo_profile: photoProfile,
    };

    try {
      const response = await fetch("http://localhost:5000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
        mode: "cors",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui profil.");
      }

      const responseBody = await response.json();
      const newToken = responseBody?.accessToken;

      if (!newToken) {
        throw new Error("Token tidak tersedia dalam respons.");
      }

      setToken(newToken);
      localStorage.setItem("token", newToken);

      // **Langsung update state agar perubahan langsung terlihat**
      setFormData({
        ...updatedData,
        birth_date: updatedData.birth_date.split("T")[0],
      });

      Swal.fire({
        icon: "success",
        title: "Profil Berhasil Diperbarui",
        text: responseBody.message,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Gagal",
        text: error.message || "Gagal memperbarui profil. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="px-4 py-10 container mx-auto">
       <Typography variant="h5" color="blue-gray" className="font-poppins">
        Profile Information
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal mt-1 font-poppins">
        Update your profile information below.
      </Typography>

      <div className="flex flex-col mt-8">
        {/* Upload Foto Profile */}
        <div className="mb-6 flex flex-col items-center md:items-start">
          <img src={photoProfile} alt="Profile" className="w-44 h-44 rounded-lg object-cover mb-4" />

          <Button onClick={toggleModal} size="sm"
            variant="outlined" // Tombol hanya border
            className="border-gray-600 text-customGreenslow hover:bg-gray-100 font-poppins  md:ml-4 lg:ml-7">
            Chage Profile
          </Button>
          <Typography variant="small" className="text-customGreenslow font-normal mt-2 font-poppins">
            <p className='mt-2'> File size: maximum 10 Megabytes (MB).</p>
            <p> Allowed file extensions: .JPG .JPEG .PNG</p>
          </Typography>

          <Dialog open={isModalOpen} handler={toggleModal}>
            <DialogHeader>Upload New Profile Image</DialogHeader>
            <DialogBody divider>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </DialogBody>
            <DialogFooter>
              <Button variant="text" color="red" onClick={toggleModal} className="mr-2">
                Cancel
              </Button>
              <Button variant="gradient" color="green" onClick={toggleModal}>
                Submit
              </Button>
            </DialogFooter>
          </Dialog>
        </div>

        {/* Form Data Profile */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
              Full Name
            </Typography>
              <Input
              size="lg" name="name" value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="!border-t-blue-gray-200 focus:!border-gray-400"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
          </div>

          <div className="w-full">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
              Email
            </Typography>
              <Input
              size="lg" name="name" value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="!border-t-blue-gray-200 focus:!border-gray-400"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
          </div>
          </div>

        <div className="w-80">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
            Call Number
          </Typography>
          <Input
            type="tel"
            size="lg"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Your Phone Number"
            className="!border-t-blue-gray-200 focus:!border-gray-400"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />
        </div>


        {/* Birth Date */}
        <div className="mb-6 mt-2 w-72">
          <Typography variant="small" className="mb-2 font-medium font-poppins">
            Birth Date
          </Typography>
          <Input
          type="date"
          size="lg"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleInputChange}
          className="!border-t-blue-gray-200 focus:!border-gray-400"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <Typography variant="small" className="mb-2 font-medium">
            Gender
          </Typography>
        <div className="flex gap-4">
          <Radio name="gender" value="Male" label="Male" checked={formData.gender === "Male"} onChange={() => handleGenderChange("Male")} className="text-white" />
          <Radio name="gender" value="Female" label="Female" checked={formData.gender === "Female"} onChange={() => handleGenderChange("Female")} className="text-white" />
        </div>
        </div>

        <div className='flex items-center mt-10'>
          <Button  onClick={handleSubmit} className="w-[60%] md:w-[17%] font-poppins text-sm font-medium ml-1 bg-customGreen">
            Save Profile
          </Button>
        </div>
       </div>
    </div>
  );
};

export default ProfileComponent;
