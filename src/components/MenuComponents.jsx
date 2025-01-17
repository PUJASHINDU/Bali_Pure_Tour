import React from "react";
import { Link } from "react-router-dom"; // Import Link dari React Router
import {
  Navbar,
  MobileNav,
  Typography,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";

// Komponen NavList yang menerima props `navItems`
function NavList({ navItems, closeNav }) {
  const [activeItem, setActiveItem] = React.useState("");

  const handleNavClick = (label) => {
    setActiveItem(label);
    if (closeNav) closeNav(); // Menutup navigasi mobile saat item diklik
  };

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-16">
      {navItems.map(({ label, icon, href }) => (
        <Typography
          key={label}
          as={Link} // Mengganti <a> dengan <Link>
          to={href} // Menggunakan `to` alih-alih `href`
          variant="small"
          color="gray"
          className={`font-medium ${
            activeItem === label
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-blue-gray-500"
          } hover:text-blue-600`}
          onClick={() => handleNavClick(label)}
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <img
              src={icon}
              alt={`${label} icon`}
              className="h-11 w-11 lg:h-8 lg:w-8 rounded-full"
            />
            <span className="text-gray-800 text-[14px]"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

// Komponen utama MenuComponents menerima props `title`, `subtitle`, dan `navItems`
export default function MenuComponents({ title, subtitle, navItems }) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <div>
      {/* Typography di atas Navbar */}
      <div className="p-4 md:ml-32 md:p-4 font-poppins text-lg text-center md:text-left mt-7">
        <Typography
          as="h1"
          variant="h4"
          color="gray"
          className="font-bold"
        >
          {title}
        </Typography>
        <Typography
          as="h2"
          variant="h6"
          className="mt-2 text-customBrown font-poppins font-extralight"
        >
          {subtitle}
        </Typography>
      </div>

      <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as={Link}
            to="/"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium font-poppins"
          >
            Service from us at Travelingkuy
          </Typography>
          <div className="hidden lg:block">
            <NavList navItems={navItems} />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        </div>
        <MobileNav open={isNavOpen} className="overflow-hidden">
          <NavList navItems={navItems} closeNav={() => setIsNavOpen(false)} />
        </MobileNav>
      </Navbar>
    </div>
  );
}
