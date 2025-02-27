import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  CardFooter,
  Button,
} from "@material-tailwind/react";

// Import local images and icons
import user from '../assets/icon/user.png';
import coin from '../assets/icon/coin.png';
import view from '../assets/icon/view.png';
import guide from '../assets/icon/guide.png';

const CardComponent = ({ imageUrl, title, location, description, Note, price, tooltips, detailPage }) => {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg mt-10">
      <CardHeader floated={false} color="blue-gray">
        <img src={imageUrl} alt={title.second} />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
      </CardHeader>

      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography variant="h4" className="mb-2 font-semibold text-xl font-poppins">
            <span className="text-customGreen">{title.first}</span>{" "}
            <span className="text-customGreenslow">{title.second}</span>
          </Typography>
          <div className="flex items-center gap-1.5">
            <Typography className="flex items-center gap-1.5 font-medium font-poppins text-customGreenslow -mt-2">
              <img src={coin} alt="" />
              {price} USD
            </Typography>
          </div>
        </div>
        <Typography className='text-customGreenslow font-poppins font-medium'>
          {location}
        </Typography>
        <Typography className='font-poppins text-customGreenslow'>
          {description}
        </Typography>
        <Typography className='font-poppins mt-2 text-customGreenslow font-semibold'>
          {Note}
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          {tooltips.map((tooltipContent, index) => (
            index === 2 ? (
              <Tooltip key={index} content={tooltipContent}>
                <Link to={detailPage} className="cursor-pointer border rounded-full border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10
                                                hover:!opacity-100 group-hover:opacity-70">
                  <img src={view} alt={`Icon ${index + 1}`} className="h-5 w-5" />
                </Link>
              </Tooltip>
            ) : (
              <Tooltip key={index} content={tooltipContent}>
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100
                                                group-hover:opacity-70">
                   <img
                    src={
                      index === 0 ? user :
                      index === 1 ? guide :
                      null
                    }
                    alt={`Icon ${index + 1}`}
                    className="h-5 w-5"
                  />
                </span>
              </Tooltip>
            )
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className='bg-customGreen font-poppins text-base' fullWidth={true}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const AllPackgeTourComponent = () => {

  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-card-destinations")
      .then(async (response) => {
        let destinations = response.data;

        // Ambil data gambar dari API
        const imagesResponse = await axios.get("http://localhost:5000/get-gallery-images");
        const imagesData = imagesResponse.data;

        // Susun data agar langsung bisa mengarah ke halaman detail berdasarkan ID
        let formattedData = destinations.map((item) => {
          const matchedImage = imagesData.find((img) => Number(img.id_package) === Number(item.id_package));

          return {
            id: item.id_package, // Tambahkan ID untuk routing
            imageUrl: matchedImage ? matchedImage.img : "https://via.placeholder.com/400",
            title: { first: "", second: item.card_name.toUpperCase() },
            description: item.about_card,
            location: "Place Penempahan Manukaya",
            Note: item.note_card,
            price: `${item.price}`,
            tooltips: ["Maximal 6 Person", "2 Guide", "View Details"],
            detailPage: `/detail/${item.id_package}` // Buat link dinamis
          };
        });

        setTours(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching card destinations:", error);
      });
  }, []);


  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tours.map((data, index) => (
          <CardComponent key={index} {...data} />
        ))}
      </div>
    </div>
  );
}

export default AllPackgeTourComponent;
