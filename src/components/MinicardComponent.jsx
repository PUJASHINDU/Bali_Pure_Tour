import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

// img
import Bali_cook from "../assets/pure cook/6N6A5632.jpg";
import Bali_bikes from "../assets/pure bike/6N6A4940.jpg";
import Bali_trek from "../assets/Pure Trek/6N6A5397.jpg";
import Pure_Tour from "../assets/pure tour/Bannerpuretour.jpg";

const MinicardComponent = () => {
  // Data untuk kartu
  const cardData = [
    {
      image: Bali_cook,
      title: { first: "BALI PURE", second: "COOKING" },
      description: "Experience the rich tapestry of Balinese culture by immersing yourself in its vibrant cuisine, creating unforgettable culinary memories.",
      link: "/DetailBaliCook", // Link halaman berbeda
    },
    {
      image: Bali_bikes,
      title: { first: "BALI PURE", second: "TREK BIKES" },
      description: "Cycling through ancient villages rich in cultural heritage offers a journey through time, where every street and building holds stories.",
      link: "/DetailBaliTrekBikes",
    },
    {
      image: Bali_trek,
      title: { first: "BALI PURE", second: "TREK" },
      description: "The tour visits a sacred temple rich in spiritual significance, located in the beautiful and historic village of Manukaya, Bali.",
      link: "/DetailBaliTreek",
    },
    {
      image: Pure_Tour,
      title: { first: "BALI PURE", second: "TOUR" },
      description: "The tour visits a sacred temple with religious nuances in a beautiful and ancient village, namely Manukaya village and history.",
      link: "/DetailBaliPureTour",
    },
  ];

  return (
    <div className="flex justify-center">
      {/* Kontainer kartu dengan grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4">
        {/* Loop untuk membuat setiap kartu berdasarkan data */}
        {cardData.map((card, index) => (
          <Card
            key={index}
            className="bg-[#F7F7F7] w-full shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Header Kartu */}
            <CardHeader color="blue-gray" className="relative h-36 mt-3">
              {card.image ? (
                <img
                  src={card.image}
                  alt={`Card ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <Typography variant="small" className="text-gray-500">
                    No Image
                  </Typography>
                </div>
              )}
            </CardHeader>

            {/* Body Kartu */}
            <CardBody>
              <Typography variant="h6" className="mb-2 font-semibold text-base font-poppins">
                <span className="text-customGreen">{card.title.first}</span>{" "}
                <span className="text-customGreenslow">{card.title.second}</span>
              </Typography>
              <Typography className="text-customGreenslow text-xs font-poppins">
                {card.description}
              </Typography>
            </CardBody>

            {/* Footer Kartu */}
            <CardFooter className="pt-2 flex justify-end">
              <Button
                size="sm"
                variant="outlined" // Tombol hanya border
                className="border-gray-600 text-gray-600 hover:bg-gray-100 font-poppins -mt-4"
                onClick={() => window.location.href = card.link} // Mengarahkan ke halaman berbeda
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MinicardComponent;
