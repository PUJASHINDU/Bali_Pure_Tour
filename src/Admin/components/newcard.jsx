import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Tooltip, CardFooter, Button } from "@material-tailwind/react";
import UpdateOptionsModal from "./Modalupdatepakettour"; // Import modal
import user from '../../assets/icon/user.png';
import coin from '../../assets/icon/coin.png';
import view from '../../assets/icon/view.png';
import guide from '../../assets/icon/guide.png';

const CardComponent = ({ id_package, imageUrl, title, location, description, Note, price, tooltips, detailPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleEditClick = () => {
    setIsModalOpen(true); // Buka modal saat tombol Edit diklik
  };

  const handleSelectOption = (option) => {
    // Tentukan rute berdasarkan pilihan user
    const route = option === "detail"
      ? `/FormUpdatePaketTourpage/${id_package}`
      : `/FormUpdateCardPaketpage/${id_package}`;

    setSelectedRoute(route);
    setIsModalOpen(false); // Tutup modal setelah memilih
  };

  return (
    <>
      <Card className="w-full max-w-[26rem] shadow-lg mt-10">
        <CardHeader floated={false} color="blue-gray">
          <img src={imageUrl} alt={title.second} />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
        </CardHeader>

        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography variant="h4" className="mb-2 font-semibold text-md font-poppins">
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
          <Typography className='text-customGreenslow font-poppins font-medium'>{location}</Typography>
          <Typography className='font-poppins text-customGreenslow'>{description}</Typography>
          <Typography className='font-poppins mt-2 text-customGreenslow font-semibold'>{Note}</Typography>

          <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
            {tooltips.map((tooltipContent, index) => (
              index === 2 ? (
                <Tooltip key={index} content={tooltipContent}>
                  <Link to={detailPage} className="cursor-pointer border rounded-full border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <img src={view} alt={`Icon ${index + 1}`} className="h-5 w-5" />
                  </Link>
                </Tooltip>
              ) : (
                <Tooltip key={index} content={tooltipContent}>
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <img src={index === 0 ? user : index === 1 ? guide : null} alt={`Icon ${index + 1}`} className="h-5 w-5" />
                  </span>
                </Tooltip>
              )
            ))}
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <Button className="bg-customGreen font-poppins text-sm" fullWidth={true} onClick={handleEditClick}>
                Edit
              </Button>
              <Button className="bg-customred font-poppins text-sm" fullWidth={true}>
                Hapus
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Modal */}
      <UpdateOptionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleSelectOption} />

      {/* Redirect setelah memilih opsi */}
      {selectedRoute && window.location.assign(selectedRoute)}
    </>
  );
};

export default CardComponent;
