// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { Spinner } from "@material-tailwind/react";
// import { useAuth } from '../Context/AuthContext';
// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography
// } from "@material-tailwind/react";
// import { Link } from 'react-router-dom';

// const LoginComponents = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let response = await fetch('http://localhost:5000/admin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//         credentials: 'include',
//       });

//       let result = await response.json();
//       let isAdmin = response.ok;

//       if (!isAdmin) {
//         response = await fetch('http://localhost:5000/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//           credentials: 'include',
//         });
//         result = await response.json();
//       }

//       if (response.ok) {
//         const { accessToken } = result;
//         if (accessToken) {
//           localStorage.setItem('accessToken', accessToken);

//           const userResponse = await fetch('http://localhost:5000/user', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${accessToken}`
//             },
//             mode: 'cors'
//           });

//           const userData = await userResponse.json();
//           login(accessToken, userData);

//           Swal.fire({
//             title: "Success!",
//             icon: "success",
//             confirmButtonText: 'OK'
//           }).then(() => {
//             if (isAdmin) {
//               navigate('/AdminDashboardpage');
//             } else {
//               navigate('/');
//             }
//           });
//         } else {
//           throw new Error('Invalid response from server');
//         }
//       } else {
//         throw new Error(result.msg || 'Login failed');
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Oops!",
//         text: error.message,
//         icon: "error",
//         confirmButtonText: 'OK'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen">
//       {loading && (
//         <div className="absolute inset-0 flex justify-center items-center bg-customGreen bg-opacity-50 z-10">
//           <Spinner className="h-10 w-10 text-customGreen-900/50" />
//         </div>
//       )}
//       <Card color="transparent" shadow={false} className={`w-4/5 max-w-4xl mt-9 ${loading ? 'blur-sm' : ''}`}>
//         <Typography variant="h4" color="blue-gray" className="text-center font-poppins text-customGreen font-semibold">
//           WELCOME BACK 👋
//         </Typography>
//         <Typography color="gray" className="mt-1 font-normal text-center font-poppins text-customGreenslow">
//           Enter your valid personal details, we protect your data
//         </Typography>
//         <form className="mt-8 mb-2" onSubmit={handleSubmit}>
//           <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
//             <div>
//               <Typography variant="h6" className="text-customGreenslow mb-2 font-poppins">
//                 Your Email
//               </Typography>
//               <Input
//                 size="lg"
//                 placeholder="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//                 labelProps={{ className: "before:content-none after:content-none" }}
//               />
//             </div>
//             <div>
//               <Typography variant="h6" className="text-customGreenslow mb-2 font-poppins">
//                 Password
//               </Typography>
//               <Input
//                 type="password"
//                 size="lg"
//                 placeholder="********"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//                 labelProps={{ className: "before:content-none after:content-none" }}
//               />
//             </div>
//           </div>

//           <Checkbox
//             label={
//               <Typography variant="small" color="gray" className="flex items-center font-normal font-poppins">
//                 I agree to the
//                 <a href="#" className="font-medium transition-colors hover:text-gray-900 fontbg-customGreen"> &nbsp;Terms and Conditions</a>
//               </Typography>
//             }
//             containerProps={{ className: "-ml-2.5" }}
//           />
//           <div className="flex justify-center mt-6">
//             <Button className="w-[40%] font-poppins text-lg bg-customGreen" type="submit">
//               Login
//             </Button>
//           </div>
//           <Typography color="gray" className="mt-4 text-center font-normal font-poppins">
//             Don't have an account yet? Click
//             <Link to="/Singinpage" className=" text-customGreen font-poppins font-semibold"> Sign Up</Link>
//           </Typography>
//         </form>
//       </Card>
//     </div>
//   );
// }

// export default LoginComponents;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Spinner } from "@material-tailwind/react";
import { useAuth } from '../Context/AuthContext';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const LoginComponents = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await fetch('http://localhost:5000/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      let result = await response.json();
      let isAdmin = response.ok;

      if (!isAdmin) {
        response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'include',
        });
        result = await response.json();
      }

      if (response.ok) {
        const { accessToken } = result;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);

          const userResponse = await fetch('http://localhost:5000/user', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            mode: 'cors'
          });

          const userData = await userResponse.json();
          login(accessToken, userData);

          Swal.fire({
            title: "Success!",
            icon: "success",
            confirmButtonText: 'OK'
          }).then(() => {
            navigate(isAdmin ? '/AdminDashboardpage' : '/');
          });
        } else {
          throw new Error('Invalid response from server');
        }
      } else {
        throw new Error(result.msg || 'Login failed');
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: error.message,
        icon: "error",
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
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
          WELCOME BACK 👋
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center font-poppins text-customGreenslow">
          Enter your valid personal details, we protect your data
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <Typography variant="h6" className="text-customGreenslow mb-2 font-poppins">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
            <div>
              <Typography variant="h6" className="text-customGreenslow mb-2 font-poppins">
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
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
          </div>

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center font-normal font-poppins">
                I agree to the
                <a href="#" className="font-medium transition-colors hover:text-gray-900 fontbg-customGreen"> &nbsp;Terms and Conditions</a>
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
            Don't have an account yet? Click
            <Link to="/Singinpage" className=" text-customGreen font-poppins font-semibold"> Sign Up</Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default LoginComponents;

