import React from 'react'
import NavbarComponent from '../components/NavbarComponent';
import { motion } from 'framer-motion';
import DeskripsiPageTourComponent from '../components/DeskripsiPageTourComponent';
import GallaryPackgeTour from '../components/GallaryPackgeTourComponent';
import FooterComponents from '../components/FooterComponents';
// img Gallry
// Impor gambar dari folder assets
import image1 from "../assets/pure cook/6N6A5573.jpg";
import image2 from "../assets/pure cook/Banner bali pure cook.jpg";
import image3 from "../assets/pure cook/home-9.jpg";
import image4 from "../assets/pure cook/home-6.jpg";
import image5 from "../assets/pure cook/home-9.jpg";

// Data untuk DeskripsiDestinasiComponents
const deskripsiData = {
  title: { first: "About Bali Pure", second: "Cook" },
  about: "Balinese authentic cooking experience Experience the rich tapestry of Balinese culture through its vibrant cuisine with a Balinese cooking experience.Dive into the heart of traditional culinary practices, guided by local experts who share their deep-rooted knowledge of spices, techniques, and flavors unique to the island.From preparing aromatic spice pastes to mastering the art of grilling satay over an open flame, each step immerses you in Balinese culinary heritage. Discover the harmony of sweet, salty, sour, and spicy flavors that define Balinese dishes, creating a sensory journey that extends beyond taste to encompass culture, history, and community.",

  program: [
    "Balinese authentic cooking experience",
    "The cooking lesson is located in the local house overlooking the rice fields.",
    "Lunch Time",
  ],
  facility: [
    "lunch on the edge of the rice fields",
    "2 tour guide provided",
  ],
  contact: [
    "Guide: 0819-1833-4664",
    "Admin: 0817-117-112",
  ],
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
    { time: "09.00-09.30 AM", description: "Enjoy a local-style Balinese lunch by the rice fields, it’s a beautiful place to have lunch. The family lunch was set up with a view to the rice paddy field with some vegetables, organic food, and Orient spice sauce with balinese home cooking." },

    { time: "09.30-12.00 AM", description: "The cooking lesson is located in the local house overlooking the rice fields.Upon arrival at the cooking place, the first step you should do is preparing the main condiment (seasoning).The menu that we will cook is purely Balinese dishes: Tempe, Tofu, pepes (steamed chicken or fish in banana leaves), mixed vegetables salad and local dessert" },

    { time: "12.00-13.15 AM", description: "Lunch Time Have your own cooked lunch while enjoying the magnificent view on the rice field’s side." },

    { time: "13.15 -14.00 AM", description: "After lunch, you will have a Short trekking through the rice fields (the Subak irrigation system UNESCO world culture heritage) and Village Garden to Puseh Temples The guide will tell the history of the temple which was built in the 9th century and the development of religion in Bali until the unification of religions in the 11th century" },

    { time: "14.00 PM", description: "Back To Hotel" },
  ];


  const priceTableRows = [
    ["USD 80", "USD 65.33", "USD 58.67", " USD 52"], // Baris 1
  ];



  const riseVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };



const DetailBaliCook = () => {
  return (
    <div>
        <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <NavbarComponent/>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <GallaryPackgeTour images={images}/>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <div className="mt-6 md:mt-12 lg:mt-8 mx-auto px-4 text-center">
          <h1 className="font-poppins text-customGreen text-lg md:text-xl font-semibold">
          Bali Pure Cook <span className='font-poppins text-customGreenslow font-semibold'>Balinese authentic cooking experience</span>
          </h1>
          <h4 className="font-poppins text-customGreenslow mt-2 text-sm md:text-base">
          Please read the tour package details in detail
          </h4>
        </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <DeskripsiPageTourComponent
          {...deskripsiData}
          tableHead={tableHead}
          tableRows={tableRows}
          priceTableRows={priceTableRows}
        />
         </motion.div>
        <FooterComponents/>
    </div>
  )
}

export default DetailBaliCook