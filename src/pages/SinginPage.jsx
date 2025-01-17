import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import SinginComponents from '../components/SinginComponent'; // Pastikan path ini sesuai dengan lokasi file NavbarComponents

// Definisikan animasi rise
const riseVariants = {
  hidden: { opacity: 0, y: 50 }, // Mulai dengan opacity 0 dan posisi lebih rendah
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Muncul dengan opacity 1 dan posisi normal
};

const SinginPage = () => {
  return (
    <div>
      {/* Wrap komponen SinginComponents dengan motion.div */}
      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <SinginComponents />
      </motion.div>
    </div>
  );
};

export default SinginPage;
