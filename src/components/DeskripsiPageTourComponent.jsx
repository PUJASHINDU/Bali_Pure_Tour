import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const DeskripsiPageTourComponent = ({
  title,
  about,
  program,
  tableRows,
  priceTableRows, // Data untuk tabel harga
  facility,
  contact,
  bookingLink,
}) => {
  const navigate = useNavigate();
  const handleBooking = () => {
    navigate("/FromBookingpage", {
      state: {
        packageName: title.second,
        priceTableRows: priceTableRows,
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7 overflow-hidden">
      <Card className="w-full max-w-screen-lg">
        <CardBody>
          {/* Title and About */}
          <Typography
            variant="h4"
            className="mb-2 font-semibold text-xl font-poppins"
          >
            <span className="text-customGreen">{title.first}</span>{" "}
            <span className="text-customGreenslow">{title.second}</span>
          </Typography>
          <Typography className="font-poppins text-justify mb-2">
            {about}
          </Typography>

          {/* Program */}
          <Typography className="font-poppins text-justify mb-2 text-xl">
            <h1 className="text-customGreen font-semibold">
              Program <span className="text-customGreenslow font-semibold">Tour</span>
            </h1>
          </Typography>
          <Typography className="font-poppins text-justify mb-2">
            <ul className="list-disc ml-6 text-justify font-poppins text-sm">
              {program.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Typography>

          {/* Rundown Table */}
          <Typography className="mt-5 mb-4">
            <h1 className="text-customGreen font-semibold text-xl font-poppins">
              Rundown{" "}
              <span className="text-customGreenslow font-semibold">Tour</span>
            </h1>
          </Typography>
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full table-fixed border border-gray-300">
              <thead>
                <tr className="font-poppins text-customGreen">
                  <th className="border-b border-gray-300 bg-white p-4 text-center align-middle w-1/4">
                    Time
                  </th>
                  <th className="border-b border-gray-300 bg-white p-4 text-center align-middle w-3/4">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(({ time, description }, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-gray-300 text-center font-poppins font-semibold text-sm">
                      {time}
                    </td>
                    <td className="p-4 border-b border-gray-300 font-poppins text-sm text-justify break-words">
                      {description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price Section */}
          <Typography className="font-poppins text-justify mb-2 mt-5 text-xl">
            <h1 className="text-customGreen font-semibold">
              Price <span className="text-customGreenslow font-semibold">Tour</span>
            </h1>
            <h4 className="text-customGreenslow text-sm mt-1">
              Tour prices vary according to the number of tourists
            </h4>
            <h4 className="text-customGreenslow text-sm mt-1">
              Price/Person
            </h4>
          </Typography>

          {/* Price Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-300 mt-4">
            <table className="w-full table-fixed border border-gray-300">
              <thead>
                <tr className="font-poppins text-customGreen">
                  <th className="border-b border-gray-300 bg-white p-4 text-center align-middle w-1/4">
                    2 Person
                  </th>
                  <th className="border-b border-gray-300 bg-white p-4 text-center align-middle w-1/4">
                    3-5 Person
                  </th>
                  <th className="border-b border-gray-300 bg-white p-4 text-center align-middle w-1/4">
                    6-10 Person
                  </th>
                  <th className="border-b border-gray-300 bg-white p-4 text-center align-middle w-1/4">
                    11-Person
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceTableRows.map((row, index) => (
                  <tr key={index}>
                    {row.map((price, i) => (
                      <td
                        key={i}
                        className="p-4 border-b border-gray-300 text-center font-poppins text-sm font-semibold"
                      >
                        {price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Facility*/}
          <Typography className="font-poppins text-justify mb-2 mt-4 text-xl">
            <h1 className="text-customGreen font-semibold">
            Facility <span className="text-customGreenslow font-semibold">Tour</span>
            </h1>
          </Typography>
          <Typography className="font-poppins text-justify mb-2">
            <ul className="list-disc ml-6 text-justify font-poppins text-sm">
              {facility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Typography>

          {/*contact*/}
          <Typography className="font-poppins text-justify mb-2 mt-4 text-xl">
            <h1 className="text-customGreen font-semibold">
             Contact <span className="text-customGreenslow font-semibold">PT Bali Pure Tour</span>
            </h1>
          </Typography>
          <Typography className="font-poppins text-justify mb-2">
            <ul className="list-disc ml-6 text-justify font-poppins text-sm">
              {contact.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Typography>
        </CardBody>

        {/* Booking Button */}
        <CardFooter className="pt-0">
          <a href={bookingLink} className="inline-block">
            <Button onClick={handleBooking}
              size="lg"
              variant="text"
              className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
            >
              Booking Now !!
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeskripsiPageTourComponent;
