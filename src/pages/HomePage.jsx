import React from 'react';
import { motion } from 'framer-motion';
import NavbarComponent from '../components/NavbarComponent';
import CourselComponent from '../components/CourselComponent';
import ServiceComponents from '../components/ServiceComponents';
import CardPackageTour from '../components/CardPackgeTour';
import GallryHomeComponents from '../components/GallryHomeComponents';
import FooterComponents from '../components/FooterComponents';
// img import
import Pure_tour from "../assets/pure tour/Bannerpuretour.jpg";
import Bali_cook from "../assets/pure cook/Banner bali pure cook.jpg";
import Bali_trek from "../assets/pure Trek/Banner bali pure trek.jpg";
import Bali_bike from "../assets/pure bike/Banner bali pure bike.jpg";

const slidesIndex = [
  {
    image: Pure_tour,
    title: "Bali Pure Tour",
    description: "Pack your bags and let's go! Bali Pure Tour is your ticket to unforgettable experiences",
  },
  {
    image: Bali_cook,
    title: "Experience the Culture",
    description: "Immerse yourself in Bali's vibrant culture through this visual journey.",
  },
  {
    image: Bali_trek,
    title: "Adventure Awaits",
    description: "Explore the natural wonders of Bali with our guided tours.",
  },
  {
    image: Bali_bike,
    title: "Cycling Paradise",
    description: "Discover Bali's beauty on two wheels.",
  },
];

const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HomePage = () => {
  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <NavbarComponent />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <CourselComponent slides={slidesIndex} />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <ServiceComponents/>
      </motion.div>

      <motion.div className="mt-10 lg:mt-20 mx-auto px-4 text-center" initial="hidden" animate="visible" variants={riseVariants}>
        <h1 className="font-poppins text-customGreenslow text-base md:text-xl">
          Favorite tour package in <span className='font-poppins text-customGreen font-semibold'>Bali Pure Tour</span>
        </h1>
        <h4 className="font-poppins text-customGreenslow mt-2 text-sm md:text-base">
          Discover and select your favorite tour package with Bali Pure Tour
        </h4>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <CardPackageTour />
      </motion.div>

      <motion.div className="mt-20 md:mt-12 lg:mt-32 mx-auto px-4 text-center" initial="hidden" animate="visible" variants={riseVariants}>
        <h1 className="font-poppins text-customGreenslow text-lg md:text-xl">
          Explore Bali with us  <span className='font-poppins text-customGreen font-semibold'>Bali Pure Tour</span>
        </h1>
        <h4 className="font-poppins text-customGreenslow mt-2 text-sm md:text-base">
          Offering an unforgettable travel experience with Bali Pure Tour
        </h4>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <GallryHomeComponents />
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <FooterComponents />
      </motion.div>
    </div>
  );
};

export default HomePage;
