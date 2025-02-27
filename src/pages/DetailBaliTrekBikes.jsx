import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import NavbarComponent from '../components/NavbarComponent';
import DeskripsiPageTourComponent from '../components/DeskripsiPageTourComponent';
import GallaryPackgeTour from '../components/GallaryPackgeTourComponent';
import FooterComponents from '../components/FooterComponents';

const BASE_URL = 'http://localhost:5000'; // Sesuaikan dengan URL backend

const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const DetailBaliTrekBikes = () => {
  const [tourData, setTourData] = useState(null);
  const [packageName, setPackageName] = useState("Paket Tidak Tersedia");
  const [galleryImages, setGalleryImages] = useState([]);
  const [rundownData, setRundownData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTourData();
  }, []);

  const fetchTourData = async () => {
    try {
      const tourResponse = await axios.get(`${BASE_URL}/package-tour/24`); // Sesuaikan ID
      const tour = tourResponse.data;

      if (!tour) throw new Error("Data paket tour kosong!");

      // Ambil package_name dari database
      const fetchedPackageName = tour.package_name || "Paket Tidak Tersedia";
      setPackageName(fetchedPackageName);
      setTourData({
        title: {
          first: "About",
          second: fetchedPackageName,
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

      // Fetch gallery images
      const galleryResponse = await axios.get(`${BASE_URL}/tour/gallery/24`);
      setGalleryImages(
        galleryResponse.data.map(img => ({ imgelink: `${BASE_URL}${img.img}` }))
      );

      // Fetch rundown
      const rundownResponse = await axios.get(`${BASE_URL}/tour/rundown/24`);
      setRundownData(
        rundownResponse.data.map(item => ({
          time: item.time || "Waktu tidak tersedia",
          description: item.description || "Deskripsi tidak tersedia",
        }))
      );

      setLoading(false);
    } catch (err) {
      console.error("Error fetching tour details:", err);
      setError("Gagal mengambil data paket tour.");
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
          <motion.div initial="hidden" animate="visible" variants={riseVariants} transition={{ delay: 0.2 }}>
            {galleryImages.length > 0 ? (
              <GallaryPackgeTour images={galleryImages} />
            ) : (
              <p className="text-center text-gray-500">No images available</p>
            )}
          </motion.div>

          {/* Bagian Title */}
          <motion.div className="mt-6 md:mt-12 lg:mt-8 mx-auto px-4 text-center" variants={riseVariants}>
            <h1 className="font-poppins text-customGreen text-lg md:text-xl font-semibold">
              {packageName}{" "} <span className="font-poppins text-customGreenslow font-semibold">A Gentle Ride Into a Deeper Part of Bali</span>
            </h1>
            <h4 className="font-poppins text-customGreenslow mt-2 text-sm md:text-base">
              Please read the tour package details in detail
            </h4>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={riseVariants} transition={{ delay: 0.6 }}>
            <DeskripsiPageTourComponent
              {...tourData}
              tableHead={["Time", "Description"]}
              tableRows={rundownData}
              priceTableRows={tourData.priceTableRows}
            />
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={riseVariants} transition={{ delay: 0.8 }}>
            <FooterComponents />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default DetailBaliTrekBikes;
