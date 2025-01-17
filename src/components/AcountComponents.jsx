import React, { useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

// import icon
import iconbar from "../assets/icon/menu-bar.png";
import iconbooking from "../assets/icon/booking-icon.png";
import ProfileComponent from "./ProfileComponent";
import BookinginformationComponent from "./BookinginformationComponent";

const AcountComponents = () => {
  const [activePage, setActivePage] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activePage) {
      case "profile":
        return <ProfileComponent />;
      case "bookinginformation":
        return <BookinginformationComponent />;
      case "inbox":
        return <div>Inbox Page</div>;
      default:
        return <ProfileComponent />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Tombol untuk toggle sidebar pada perangkat mobile */}
      <div className="p-4 md:hidden">
        <IconButton
          onClick={handleSidebarToggle}
          className="w-full bg-transparent hover:bg-transparent"
        >
          <img src={iconbar} alt="" className="h-7 w-7 mt-5" />
        </IconButton>
      </div>

      {/* Sidebar dengan kondisi buka/tutup */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-1/4 lg:w-1/5 h-screen sticky top-0 p-4 bg-white shadow-xl`}
      >
        <Card className="h-full shadow-none">
          <List className="font-poppins text-customGreenslow font-medium">
            <ListItem
              onClick={() => setActivePage("profile")}
              className={activePage === "profile" ? "bg-gray-200" : ""}
            >
              <ListItemPrefix>
                <UserCircleIcon className="h-7 w-7 text-customGreenslow" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem
              onClick={() => setActivePage("bookinginformation")}
              className={activePage === "bookinginformation" ? "bg-blue-100" : ""}
            >
              <ListItemPrefix>
                <img src={iconbooking} alt="" className="h-7 w-7" />
              </ListItemPrefix>
              Booking History
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-6 w-6" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>

      {/* Konten Halaman Berdasarkan Menu yang Dipilih */}
      <div className="flex-grow p-4 md:w-3/4 lg:w-4/5">
        {renderContent()}
      </div>
    </div>
  );
};

export default AcountComponents;
