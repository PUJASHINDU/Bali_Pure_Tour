import { Typography } from '@material-tailwind/react';
import React from 'react';

import iconchek from '../assets/icon/check.png';
import About from "../assets/pure tour/img_about.jpg";

const ServiceComponents = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center lg:ml-7">
        {/* Bagian Gambar */}
        <div className="w-full">
          <img
            src={About}
            alt="Tour Image"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Bagian Teks */}
        <div className="flex flex-col items-start ">
          {/* Section Title */}
          <Typography
            variant="h1"
            className="font-poppins text-customGreenslow text-lg lg:text-xl leading-relaxed"
          >
            About Us{' '}
            <span className="text-customGreen font-semibold">
              Bali Pure Tour
            </span>
          </Typography>
          <Typography
            variant="paragraph"
            className="mt-4 text-customGreenslow text-sm lg:text-base font-poppins"
          >
            Discover the soul of Bali with Bali Pure Tour. We offer immersive journeys through the island’s most sacred temples, vibrant cultural experiences, and stunning natural landscapes. Our expertly
            guided tours connect you with Bali’s rich heritage, offering an authentic and unforgettable adventure. Experience the magic of Bali—where tradition, nature, and spirituality unite.
          </Typography>

          <Typography
            variant="paragraph"
            className="mt-2 -mb-2 text-customGreenslow text-sm lg:text-base font-poppins"
          >
            Service in Bali Pure Tour
          </Typography>

          {/* Services List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full text-customGreenslow font-poppins">
            {[
              'Bali Pure Tour',
              'Bali Pure Cook',
              'Bali Pure Trek',
              'Bali Pure Trek Bycicle',
            ].map((service, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 text-sm lg:text-base"
              >
                <img src={iconchek} alt="Check Icon" className="w-5 h-5" />
                <Typography as="span" className='font-poppins '>{service}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponents;
