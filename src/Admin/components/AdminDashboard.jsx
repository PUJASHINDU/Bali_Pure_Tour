import React, { useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Typography,
} from "@material-tailwind/react";

// Import icon
import iconbar from "../../assets/icon/menu-bar.png";
import iconhome from "../../assets/icon/homedash.png";
import manajemen1 from "../../assets/icon/product-design.png";
import manajemen2 from "../../assets/icon/manajemenbooking.png"
import manajemen3 from "../../assets/icon/bill.png"

import HomeAdmin from "./HomeAdmin";
import ManajemenPaketTourComponent from "../components/ManajemenPaketTourComponents";
import ManajemenPemesananComponents from "../components/ManajemenPemesananComponents";
import MeninjauPaymentComponents from "./MeninjauPaymentComponents";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("HomeAdmin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false); // Menutup sidebar setelah klik menu
  };

  const renderContent = () => {
    switch (activePage) {
      case "HomeAdmin":
        return <HomeAdmin />;
      case "ManajemenPaketTourComponents":
        return <ManajemenPaketTourComponent />;
      case "ManajemenPemesananComponents":
        return <ManajemenPemesananComponents />;
      case "MeninjauPaymentComponents":
        return <MeninjauPaymentComponents />;
      default:
        return <HomeAdmin />;
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
        className={`${isSidebarOpen ? "block" : "hidden"
          } md:block md:w-1/4 lg:w-1/5 h-screen sticky top-0 p-4 bg-white shadow-xl`}
      >
        <Card className="h-full shadow-none">
          <List className="font-poppins text-customGreenslow font-medium">
            <ListItem
              onClick={() => handleMenuClick("HomeAdmin")}
              className={activePage === "HomeAdmin" ? "bg-gray-200" : ""}
            >
              <ListItemPrefix>
                <img src={iconhome} alt="" className="h-7 w-7" />
              </ListItemPrefix>
              <Typography className="text-xs font-semibold font-poppins">Home</Typography>
            </ListItem>
            <ListItem
              onClick={() => handleMenuClick("ManajemenPaketTourComponents")}
              className={activePage === "ManajemenPaketTourComponents" ? "bg-blue-100" : ""}
            >
              <ListItemPrefix>
                <img src={manajemen1} alt="" className="h-7 w-7" />
              </ListItemPrefix>
              <Typography className="text-xs font-semibold font-poppins">Manajemen Paket Tour</Typography>
            </ListItem>
            <ListItem
              onClick={() => handleMenuClick("ManajemenPemesananComponents")}
              className={activePage === "ManajemenPemesananComponents" ? "bg-blue-100" : ""}
            >
              <ListItemPrefix>
                <img src={manajemen2} alt="" className="h-7 w-7" />
              </ListItemPrefix>
              <Typography className="text-xs font-semibold font-poppins">Manajemen Pemesanan</Typography>
            </ListItem>
            <ListItem
              onClick={() => handleMenuClick("MeninjauPaymentComponents")}
              className={activePage === "MeninjauPaymentComponents" ? "bg-blue-100" : ""}
            >
              <ListItemPrefix>
                <img src={manajemen3} alt="MeninjauPaymentComponents" className="h-7 w-7" />
              </ListItemPrefix>
              <Typography className="text-xs font-semibold font-poppins">Meninjau Payment</Typography>
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

export default AdminDashboard;
