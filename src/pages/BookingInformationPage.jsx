import React from 'react'
import BookinginformationComponent from '../components/BookinginformationComponent';
import { motion } from 'framer-motion';
import FooterComponents from '../components/FooterComponents'
import NavbarComponent from '../components/NavbarComponent'


const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const BookingInformationPage = () => {
  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <NavbarComponent />
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={riseVariants}>
      <BookinginformationComponent />
      </motion.div>
      <FooterComponents/>
    </div>
  )
}

export default BookingInformationPage
