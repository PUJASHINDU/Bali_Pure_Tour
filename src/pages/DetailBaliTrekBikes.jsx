import React from 'react'
import NavbarComponent from '../components/NavbarComponent';
import DeskripsiPageTourComponent from '../components/DeskripsiPageTourComponent';
import GallaryPackgeTour from '../components/GallaryPackgeTourComponent';
import FooterComponents from '../components/FooterComponents';
import { motion } from 'framer-motion';

// img Gallry
// Impor gambar dari folder assets
import image1 from "../assets/pure bike/Banner bali pure bike.jpg";
import image2 from "../assets/pure bike/6N6A4762.jpg";
import image3 from "../assets/pure bike/6N6A4940.jpg";
import image4 from "../assets/pure bike/6N6A4919.jpg";
import image5 from "../assets/pure bike/6N6A4910.jpg";

// Data untuk DeskripsiDestinasiComponents
const deskripsiData = {
  title: { first: "About Bali Pure", second: "Trek Bikes" },
  about: "Experience the timeless charm of cycling through heritage-rich ancient villages, where every turn reveals stories from centuries past. Pedal through narrow alleys flanked by stone houses adorned with wooden shutters and vibrant flower boxes, pass under ancient archways, and discover hidden cultural treasures like centuries-old temples and secluded shrines. This journey is more than a ride—it's a deep dive into history. Taste traditional local cuisine, connect with communities, and witness fields and orchards tended by generations of farmers. It's a perfect escape from the modern rush, offering a glimpse into a world where the past and present coexist in harmony.Ready to embark on this unforgettable cycling adventure? Step into a world where time stands still and tradition thrives!",

  program: [
    "Cycling down village roads and rice fields",
    "Visit to a traditional family house and temple in Penempahan village.",
    "Enjoy a delicious lunch",
  ],
  facility: [
    "2 tour guide provided",
    "Free Bicycle",
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
    { time: "9.00 – 9.30 AM", description: "Drive to our starting point. Our bicycle ride will then begin along back roads mostly downhill through villages and rice fields (approx 2 hours)." },
    { time: "10.00 – 12.15 AM", description: "We will introduce you to traditional life and guide you into a family compound and temple at Penempahan village. (sarong will be provided) Along the way, you may stop for taking pictures or a short rest to soak in the views." },
    { time: "12.00 – 14.00 PM", description: "Enjoy a lovely lunch and at the end of the trip, there is an opportunity to refresh in a swimming pool." },
    { time: "12.00 – 14.00 PM", description: "Back To Hotel" },
  ];


  const priceTableRows = [
    ["USD 80", "USD 65.33", "USD 58.67", " USD 52"], // Baris 1
  ];

  const riseVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };





const DetailBaliTrekBikes = () => {
  return (
    <div>
        <NavbarComponent/>
        <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <GallaryPackgeTour images={images}/>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={riseVariants}>
        <div className="mt-6 md:mt-12 lg:mt-8 mx-auto px-4 text-center">
          <h1 className="font-poppins text-customGreen text-lg md:text-xl font-semibold">
          Bali Pure Bikes <span className='font-poppins text-customGreenslow font-semibold'>A Gentle Ride Into a Deeper Part of Bali</span>
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

export default DetailBaliTrekBikes
