import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import AllPackgeTourComponent from '../components/AllPackgeTourComponent'
import { motion } from 'framer-motion';
import FooterComponents from '../components/FooterComponents'


const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AllPackgeTourPage = () => {
  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
      <NavbarComponent/>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
      <AllPackgeTourComponent/>
      </motion.div>
      <FooterComponents/>
    </div>
  )
}

export default AllPackgeTourPage
