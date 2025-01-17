import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.jpg"
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);

  // Handle resizing untuk navbar mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Daftar navigasi
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-customGreen">
      <Typography as="li" variant="small" className="p-1 font-poppins font-medium text-base">
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-poppins font-medium text-base">
        <Link to="" className="flex items-center">
          About
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-poppins font-medium text-base">
        <Link to="/AllPackgeTourPage" className="flex items-center">
          Package Tour
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-poppins font-medium text-base">
        <Link to="/FromBookingpage" className="flex items-center">
          Booking Tour
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-poppins font-medium text-base">
        <Link to="/AdminDashboardpage" className="flex items-center">
          Contact
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}// Ganti dengan URL gambar/logo Anda
            alt="logo bali Pure Tour "
            className="h-10 w-10 object-cover"
          />
          <span className="text-base font-semibold font-poppins text-customGreen">Bali Pure Tour</span>
        </div>
      <div className="flex-grow flex justify-center">
        <div className="hidden lg:block">{navList}</div>
      </div>
      <div className="flex items-center gap-4">

          <>
            <Link to="/Singinpage">
              <Button variant="text" size="m" className="hidden lg:inline-block bg-customGreen">
                <span className="text-white font-poppins">Sign In</span>
              </Button>
            </Link>
            <Link to="/LoginPage">
              <Button variant="text" size="m" className="hidden lg:inline-block bg-customGreen">
                <span className="text-white font-poppins">Log In</span>
              </Button>
            </Link>
          </>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-customGreen hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
    </div>
    <MobileNav open={openNav}>
      {navList}
      <div className="flex items-center gap-x-1">
          <>
            <Link to="/Loginpage">
              <Button fullWidth variant="text" size="sm" className="bg-customGreen">
                <span className="text-white font-poppins">Log In</span>
              </Button>
            </Link>
            <Link to="/Singinpage">
              <Button fullWidth variant="text" size="sm" className="bg-customGreen">
                <span className="text-white font-poppins">Sign Up</span>
              </Button>
            </Link>
          </>

      </div>
    </MobileNav>
  </Navbar>
  );
}

export default NavbarComponent;
