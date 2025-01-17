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
import { Link } from 'react-router-dom';

const LoginComponents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
      // Simulate login logic
      Swal.fire({
        title: "Good job!",
        text: "Login successful!",
        icon: "success",
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');  // Redirect ke halaman home setelah pengguna mengklik OK
        }
      });
    } catch (error) {
      console.error('Login Failed:', error);
      Swal.fire({
        title: "Oops!",
        text: "Login failed. Please check your credentials.",
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
          <Spinner className="h-10 w-10 text-customGreen-900/50" />
        </div>
      )}
      <Card color="transparent" shadow={false} className={`w-4/5 max-w-4xl mt-9 ${loading ? 'blur-sm' : ''}`}>
        <Typography variant="h4" color="blue-gray" className="text-center font-poppins text-customGreen font-semibold">
            WELCOME BACK USER 👋
        </Typography>
        <Typography variant="h6" color="blue-gray" className="text-center text-sm -ml-4 font-poppins text-customGreenslow mt-2">
            Login Here
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center font-poppins text-customGreenslow">
          Enter your valid personal details
          we protect your data
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <Typography variant="h6"  className="text-customGreenslow mb-2 font-poppins">
                Your Username
              </Typography>
              <Input
                size="lg"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6"  className="text-customGreenslow mb-2 font-poppins">
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
                  className="font-medium transition-colors hover:text-gray-900 fontbg-customGreen"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <div className="flex justify-center mt-6">
            <Button className="w-[40%] font-poppins text-lg bg-customGreen" type="submit">
              Login
            </Button>
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal font-poppins">
          Hey users, don't you have an account yet?
          If not, click{" "}
          <Link to="/Singinpage" className=" text-customGreen font-poppins font-semibold">
              Sign Up
          </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default LoginComponents;
