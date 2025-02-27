import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent";
import DeskripsiPageTourComponent from "../components/DeskripsiPageTourComponent";
import GallaryPackgeTour from "../components/GallaryPackgeTourComponent";
import FooterComponents from "../components/FooterComponents";

const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const DetailBaliPureTour = () => {
  const [tourData, setTourData] = useState({
    title: { first: "About", second: "" },
    about: "Deskripsi tidak tersedia.",
    program: [],
    facility: [],
    contact: [],
    bookingLink: "#",
    priceTableRows: [["-", "-", "-", "-"]],
  });

  const [galleryImages, setGalleryImages] = useState([]);
  const [rundownData, setRundownData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageName, setPackageName] = useState("Paket Tidak Tersedia");

  useEffect(() => {
    fetchTourDetail();
  }, []);

  const fetchTourDetail = async () => {
    try {
      const BASE_URL = "http://localhost:5000"; // Tambahkan BASE_URL

      const response = await axios.get(`${BASE_URL}/package-tour/26`);
      const tour = response.data;

      if (!tour) throw new Error("Data paket tour kosong!");

      // Ambil package_name dari database
      const fetchedPackageName = tour.package_name || "Paket Tidak Tersedia";
      setPackageName(fetchedPackageName);

      setTourData({
        title: {
          first: "About",
          second: fetchedPackageName, // Menggunakan package_name sebagai second
        },
        about: tour.about_package || "Deskripsi tidak tersedia.",
        program: tour.program_tour?.split(". ") || [],
        facility: tour.facility_tour?.split(". ") || [],
        contact: tour.contact_pt?.split(". ") || [],
        bookingLink: tour.booking_link || "/FromBookingpage",
        priceTableRows: [
          [
            tour.price_2_person ? `$${tour.price_2_person.toFixed(2)}` : "-",
            tour.price_3_5_person ? `$${tour.price_3_5_person.toFixed(2)}` : "-",
            tour.price_6_10_person ? `$${tour.price_6_10_person.toFixed(2)}` : "-",
            tour.price_11_person ? `$${tour.price_11_person.toFixed(2)}` : "-",
          ],
        ],
      });

      // Fetch gallery dengan BASE_URL
      const galleryResponse = await axios.get(`${BASE_URL}/tour/gallery/26`);
      console.log("Gallery API Response:", galleryResponse.data); // Debugging

      if (galleryResponse.data && Array.isArray(galleryResponse.data)) {
        setGalleryImages(
          galleryResponse.data.map(img => ({
            imgelink: `${BASE_URL}${img.img}`, // Ubah ke URL absolut
          }))
        );
      } else {
        setGalleryImages([]); // Jika tidak ada data, set ke array kosong
      }

      // Fetch rundown
      const rundownResponse = await axios.get(`${BASE_URL}/tour/rundown/26`);
      setRundownData(
        rundownResponse.data.map(item => ({
          time: item.time || "Waktu tidak tersedia",
          description: item.description || "Deskripsi tidak tersedia",
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching tour details:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={riseVariants}>
      <NavbarComponent />
      {loading ? (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-customGreen border-t-transparent rounded-full animate-spin transition-all duration-500 ease-in-out"></div>
          <p className="text-xl font-medium text-gray-700 animate-pulse font-poppins">Loading, please wait...</p>
        </div>
      </div>
      ) : (

        <>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={riseVariants}
            transition={{ delay: 0.2 }}
          >
            {galleryImages.length > 0 ? (
              <GallaryPackgeTour images={galleryImages} />
            ) : (
              <p className="text-center text-gray-500">No images available</p>
            )}
          </motion.div>

          {/* Bagian Title */}
          <motion.div
            className="mt-6 md:mt-12 lg:mt-8 mx-auto px-4 text-center"
            variants={riseVariants}
          >
            <h1 className="font-poppins text-customGreen text-lg md:text-xl font-semibold">
              {packageName}{" "}
              <span className="font-poppins text-customGreenslow font-semibold">
                The Essence Of Bali
              </span>
            </h1>
            <h4 className="font-poppins text-customGreenslow mt-2 text-sm md:text-base">
              Please read the tour package details in detail
            </h4>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={riseVariants}
            transition={{ delay: 0.6 }}
          >
            <DeskripsiPageTourComponent
              {...tourData}
              tableHead={["Time", "Description"]}
              tableRows={rundownData}
              priceTableRows={tourData.priceTableRows}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={riseVariants}
            transition={{ delay: 0.8 }}
          >
            <FooterComponents />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default DetailBaliPureTour;
