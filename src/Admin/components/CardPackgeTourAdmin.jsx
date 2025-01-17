import React from 'react';
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
import img1 from '../../assets/pure tour/Bannerpuretour.jpg';
import img2 from '../../assets/pure cook/home-10.jpg';
import img3 from '../../assets/Pure Trek/6N6A5401.jpg';
import img4 from '../../assets/pure bike/Banner bali pure bike.jpg'

import user from '../../assets/icon/user.png';
import coin from '../../assets/icon/coin.png';
import view from '../../assets/icon/view.png';
import guide from '../../assets/icon/guide.png';

const cardData = [
  {
    imageUrl: img1,
    title: { first: "BALI PURE", second: "TOUR" },
    description: "The tour visits a sacred temple with religious nuances in a beautiful and ancient village, namely Manukaya village",
    Note: "Note: Prices can change according to the number of tourist quotas",
    location:"Place Penempahan Manukaya",
    price: "58.67 USD",
    tooltips: [
      "Maximal 6 Person",
      "View Details",
      "2 Guide"
    ],
    detailPage: "/DeskripsiVillaSuryapage",
  },
  {
    imageUrl: img2,
    title: { first: "BALI PURE", second: "COOK" },
    description: "Authentic balinese cooking Experience the rich tapestry of Balinese culture through its vibrant cuisine with a Balinese cooking",
    Note: "Note: Prices can change according to the number of tourist quotas",
    location:"Place Penempahan Manukaya",
    price: "43.33 USD",
    tooltips: [
      "Maximal 15 Person",
      "2 Guide",
      "View Details",

    ],
    detailPage: "/DeskripsiVillaSaktipage",
  },
  {
    imageUrl: img3,
    title: { first: "BALI PURE", second: "TREK" },
    description: "The track Balinese Ancient Village Structure Join us to explore more about Ancient Village Structures and gain new experiences in Bali.",
    location:"Place Penempahan Manukaya",
    Note: "Note: Prices can change according to the number of tourist quotas",
    location:"Place Penempahan Manukaya",
    price: "USD 58.67",
    tooltips: [
      "Maximal 5 Person",
      "2 Guide",
      "View Details",
    ]
  },

  {
    imageUrl: img4,
    title: { first: "BALI PURE", second: "BIKES" },
    description: "The track Balinese Ancient Village Structure Join us to explore more about Ancient Village Structures and gain new experiences in Bali.",
    location:"Place Penempahan Manukaya",
    Note: "Note: Prices can change according to the number of tourist quotas",
    location:"Place Penempahan Manukaya",
    price: "USD 58.67",
    tooltips: [
      "Maximal 5 Person",
      "2 Guide",
      "View Details",
    ]
  },
];

const CardComponent = ({ imageUrl, title,location, description, Note, price, tooltips, detailPage }) => {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg mt-10">
      <CardHeader floated={false} color="blue-gray">
        <img src={imageUrl} alt={title} />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
      </CardHeader>

      <CardBody>
        <div className="mb-2 flex items-center justify-between">
           <Typography variant="h4" className="mb-2 font-semibold text-lg font-poppins">
              <span className="text-customGreen">{title.first}</span>{" "}
              <span className="text-customGreenslow">{title.second}</span>
            </Typography>
          <div className="flex items-center gap-1.5">
            <Typography
              className="flex items-center gap-1.5 font-medium font-poppins text-customGreenslow -mt-2" >
              <img src={coin} alt="" />
              {price}
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
                <a href={detailPage} className="cursor-pointer border rounded-full border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10
                                                hover:!opacity-100 group-hover:opacity-70">
                  <img src={view} alt={`Icon ${index + 1}`} className="h-5 w-5" />
                </a>
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
  <div className="flex flex-col gap-2">
    <Button className="bg-customGreen font-poppins text-base" fullWidth={true}>
      Book Now
    </Button>
    <div className="flex justify-between gap-2">
      <Button className="bg-customGreen font-poppins text-sm" fullWidth={true}>
        Edit
      </Button>
      <Button className="bg-customred font-poppins text-sm" fullWidth={true}>
        Hapus
      </Button>
    </div>
  </div>
</CardFooter>
    </Card>
  );
};

const CardPackageTour = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cardData.map((data, index) => (
          <CardComponent key={index} {...data} />
        ))}
      </div>
    </div>
  );
}

export default CardPackageTour;
