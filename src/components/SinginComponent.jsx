import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Spinner } from "@material-tailwind/react"; // Import Spinner
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
// import { Link } from 'react-router-dom';

const SinginComponent = () => {
  const navigate = useNavigate();  // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);  // State loading

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true
    try {
      const response = await fetch('http://localhost:5000/user-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        mode: 'cors'  // Pastikan mode ini diatur
      });

      if (response.ok) {
        Swal.fire({
          title: "Good job!",
          text: "Registration successful!",
          icon: "success",
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/Loginpage');  // Redirect ke halaman login setelah pengguna mengklik OK
          }
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration Failed:', error);
      Swal.fire({
        title: "Oops!",
        text: "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);  // Set loading to false setelah proses selesai
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-customGreen bg-opacity-50 z-10">
          <Spinner className="h-10 w-10 text-customBrowntwo-900/50" />
        </div>
      )}
      <Card color="transparent" shadow={false} className={`w-4/5 max-w-4xl mt-9 ${loading ? 'blur-sm' : ''}`}>
        <Typography variant="h4"  className=" text-customGreen text-center font-poppins  font-semibold">
          WELCOME USER 👋
        </Typography>
        <Typography variant="h6"  className=" text-customGreenslow text-center text-sm -ml-4 font-poppins mt-2">
          Sign Up Here
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center font-poppins">
          Enter your valid personal details
          we protect your data
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <Typography variant="h6"  className=" text-customGreenslow mb-2 font-poppins">
                Name
              </Typography>
              <Input
                size="lg"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6"  className=" text-customGreenslow mb-2 font-poppins">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6"  className=" text-customGreenslow mb-2 font-poppins">
                Phone Number
              </Typography>
              <Input
                size="lg"
                placeholder="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6"  className=" text-customGreenslow mb-2 font-poppins">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal font-poppins"
              >
                I agree to the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-customGreenslow font-poppins text-customGreen"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <div className="flex justify-center mt-6">
            <Button className="w-[40%] font-poppins text-lg bg-customGreen" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SinginComponent;
