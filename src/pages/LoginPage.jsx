import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import LoginComponent from '../components/LoginComponent'; // Pastikan path ini sesuai dengan lokasi file NavbarComponents

const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Loginpage = () => {
  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <LoginComponent />
      </motion.div>
    </div>
  );
};

export default Loginpage;

