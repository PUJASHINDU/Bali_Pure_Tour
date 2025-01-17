import React from 'react';
import { Carousel, Typography } from "@material-tailwind/react";

const CourselComponents = ({ slides }) => {
  return (
    <div className="overflow-hidden mt-5 mb-20">
      <div className="w-[88vw] mx-auto">
        <Carousel className="rounded-xl overflow-hidden">
          {slides.map((slide, index) => (
            <div key={index} className="relative h-72 md:h-[490px] w-full">
              <img
                src={slide.image}
                alt={`image ${index + 1}`}
                className="h-full w-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black/10 rounded-xl">
                <div className="text-center">
                  <Typography
                    variant="h1"
                    color="white"
                    className="mb-4 text-[20px] md:text-base lg:text-5xl font-poppins whitespace-nowrap"
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="lead"
                    color="white"
                    className="mb-12 opacity-80 text-base"
                  >
                    {slide.description}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CourselComponents;
