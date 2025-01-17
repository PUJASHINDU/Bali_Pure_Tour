import React from 'react';
import { motion } from 'framer-motion';
import NavbarComponent from '../components/NavbarComponent';
import DeskripsiPageTourComponent from '../components/DeskripsiPageTourComponent';
import GallaryPackgeTour from '../components/GallaryPackgeTourComponent';
import FooterComponents from '../components/FooterComponents';
// img Gallry
import image1 from "../assets/pure tour/Bannerpuretour.jpg";
import image2 from "../assets/pure tour/pure tour-6.jpg";
import image3 from "../assets/pure tour/pure tour-10.jpg";
import image4 from "../assets/pure tour/pure tour-9.jpg";
import image5 from "../assets/pure tour/pure tour-3.jpg";

// Data untuk DeskripsiDestinasiComponents
const deskripsiData = {
  title: { first: "About Bali Pure", second: "Tour" },
  about: "The essence of Bali Pakerisan River Valley to the north of Ubud was listed as a Cultural Heritage Area by UNESCO in 2012. This mystical river valley contains ancient ancestral sites dating back to 8th - 12th centuries. Ancient animist beliefs on Bali maintains everything has a soul and spirit. As influences of Hinduism and Buddhism spread from India to Bali via Javanese kingdoms, gradually Hindu gods became manifested into the Balinese spirit belief and in the elements of nature. The religion of Bali was known as Agama Tirta - the religion of water. Agama Siwa Buddha is the blend of Shivaism and Buddhism along with the conceptions of the cosmos or universe. On this journey with Pure Bali Tour, learn about how these ancient belief systems unified. Also learn about the complex irrigation system known in Bali as subak. Dating back to 9th century, water diverted from mountain sources to water-sharing communities ensures equal distribution to all. Subak reflects the Balinese outlook on life called Tri Hita Karana - a philosophy which maintains balance among the natural, physical, and spiritual worlds.",
  program: ["Gumang Temple", "Tirta Empul or Mengening Temple", "Pegulingan Temple"],
  facility: ["Lunch on the edge of the rice fields", "2 tour guides provided"],
  contact: ["Guide: 0819-1833-4664", "Admin: 0817-117-112"],
  bookingLink: "#",
};

const images = [
  { imgelink: image1 },
  { imgelink: image2 }, 
  { imgelink: image3 },
  { imgelink: image4 },
  { imgelink: image5 },
];

const tableHead = ["Time", "Description"];
const tableRows = [
  { time: "08:00 - 09:30 AM", description: "The journey start’s at the compound..." },
  { time: "09:30 - 10:20 AM", description: "Visit Ancestral temples dating back..." },
  { time: "10:20 - 11:20 AM", description: "Continue to the nearby holy spring..." },
  { time: "11:10 - 12:00 AM", description: "Conclude your temple explorations..." },
  { time: "12:00 - 13:00 PM", description: "Enjoy a local-style Balinese lunch..." },
];

const priceTableRows = [["USD 80", "USD 65.33", "USD 58.67", "USD 52"]];

const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const DetailBaliPureTour = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={riseVariants}
    >
      <NavbarComponent />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={riseVariants}
        transition={{ delay: 0.2 }}
      >
        <GallaryPackgeTour images={images} />
      </motion.div>
        <motion.div className="mt-6 md:mt-12 lg:mt-8 mx-auto px-4 text-center" variants={riseVariants}>
          <h1 className="font-poppins text-customGreen text-lg md:text-xl font-semibold">
            Bali Pure Tour <span className='font-poppins text-customGreenslow font-semibold'>The Essence Of Bali</span>
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
          {...deskripsiData}
          tableHead={tableHead}
          tableRows={tableRows}
          priceTableRows={priceTableRows}
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
    </motion.div>
  );
};

export default DetailBaliPureTour;
