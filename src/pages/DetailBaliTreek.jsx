import React from 'react'
import NavbarComponent from '../components/NavbarComponent';
import DeskripsiPageTourComponent from '../components/DeskripsiPageTourComponent';
import GallaryPackgeTour from '../components/GallaryPackgeTourComponent';
import FooterComponents from '../components/FooterComponents';
// img Gallry
// Impor gambar dari folder assets
import image1 from "../assets/Pure Trek/6N6A5341.jpg";
import image2 from "../assets/Pure Trek/6N6A5364.jpg";
import image3 from "../assets/Pure Trek/6N6A5397.jpg";
import image4 from "../assets/Pure Trek/6N6A5423.jpg";
import image5 from "../assets/Pure Trek/Banner bali pure trek.jpg";

// Data untuk DeskripsiDestinasiComponents
const deskripsiData = {
  title: { first: "About Bali Pure", second: "Trek" },
  about: "Discover the uniqueness of the Balinese Ancient Village Structure, a concept that organizes community life in harmony with spirituality, society, and nature. Ancient villages like Penempahan, located in the Pakerisan River Valley, follow traditional divisions based on ancient inscriptions, consisting of three main elements: Parahyangan (Temple Area), which serves as the center of worship and spiritual life of the village Pawongan (Settlement), where social interactions and daily activities take place and Pabelasan (Natural Area), managed for agriculture and representing the balance between humans and their environment. Through this tour, you will witness firsthand how this structure is applied in the village, see ancient temples, stroll through the settlements, and enjoy the natural beauty surrounding the village. Explore this ancient Balinese village and learn how the community maintains a balance between tradition and the environment, passed down from generation to generation.",

  program: [
    "Explanation of Balinese architecture based on ancient scripts (Lontar)",
    "See mask-making and the process of making Wild Bali Coffee and Virgin Coconut Oil.",
    "Explanation of the temple's history.",
    "Learn about medicinal plants and bamboo forest.",
    "See the Subak irrigation system.",
    "Lunch with a view of the rice fields refreshment with cold towels."
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
    {  time: "09:00 - 09:30 AM",
      description: (
        <>
          <p>Arrive at Penempahan village</p>
          <ul className='list-disc ml-5'>
            <li>Greeting</li>
            <li>Our guide will welcome and meet you</li>
          </ul>
        </>
      ),
    },

    {  time: "09.30 – 9.50 AM",
      description: (
        <>
          <p>Visit the Compound of Penempahan Villages Leader (Bendesa)</p>
          <ul className='list-disc ml-5'>
            <li>Welcome tea and balinese cake (Jaje Uli)</li>
            <li>Explanation about the history of penempahan village.</li>
          </ul>
        </>
      ),
    },

    { time: "9.00 – 10.20 AM", description: "The guide will share about Bali architecture based on Ancient script (Lontar) walk around the compound to see the layout of the Balinese house and the function of each building" },

    { time: "10.20 – 10.45 AM", description: "walk to the backyard of the house to see the secret mask-making and learn about masks in Bali, we might even get a glimpse of the process of making Wild Bali Coffee and Virgin Coconut oil." },

    {  time: "10.45 – 11.30 AM",
      description: (
        <>
          <p>Walk to the head part of village and visit Jagasari/Puseh Temples</p>
          <ul className='list-disc ml-5'>
            <li>Sarong will be provided</li>
            <li>The guide will tell the history of the temple which was built in the 9th century and the development of religion in Bali until the unification of
              religions in the 11th century</li>
          </ul>
        </>
      ),
    },

    {  time: "12.00 – 12.20 AM",
      description: (
        <>
          <ul className='list-disc ml-5'>
            <li>Visiting bone carvers, which is one of the crafts done by the villagers</li>
            <li>Walk in rice paddy fields, the Subak irrigation system UNESCO world culture heritage</li>
          </ul>
        </>
      ),
    },

    {  time: "12.00 – 13.00 PM",
      description: (
        <>
        <p>Arrived at lunch place with rice field view</p>
          <ul className='list-disc ml-5'>
            <li>Got fresh from the cold towel and washing hands in preparation for lunch</li>
            <li>Lunch Time</li>
          </ul>
        </>
      ),
    },

    { time: "14.00 PM", description: "Back To Hotel" },
  ];


  const priceTableRows = [
    ["USD 80", "USD 65.33", "USD 58.67", " USD 52"], // Baris 1
  ];





const DetailBaliTreek = () => {
  return (
    <div>
        <NavbarComponent/>
        <GallaryPackgeTour images={images}/>
        <div className="mt-6 md:mt-12 lg:mt-8 mx-auto px-4 text-center">
          <h1 className="font-poppins text-customGreen text-lg md:text-xl font-semibold">
          Bali Pure Trek <span className='font-poppins text-customGreenslow font-semibold'>Balinese Ancient Village Structure</span>
          </h1>
          <h4 className="font-poppins text-customGreenslow mt-2 text-sm md:text-base">
          Please read the tour package details in detail
          </h4>
        </div>
        <DeskripsiPageTourComponent
          {...deskripsiData}
          tableHead={tableHead}
          tableRows={tableRows}
          priceTableRows={priceTableRows}
        />
        <FooterComponents/>
    </div>
  )
}

export default DetailBaliTreek