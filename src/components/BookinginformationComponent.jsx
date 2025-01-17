import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const BookinginformationComponent = ({
  title = { first: "Hallo ", second: "Lana Del Ray" },
  about = "Here are the tour package booking details, along with the order status and payment status.",
  packgetour = "-",
  peoplejointour = "-",
  price = "-",
  tourdates = "-",
  statuspayment = "-",
  statusbooking = "-",
  information= "Hello! Here, you can view the details of your booking tour package. Be sure to regularly check the payment status and booking status on this page so you don’t miss any updates about your tour booking.",
  bookingLink = "#",
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-4 overflow-hidden">
      <Card className="w-full max-w-screen-md">
        <CardBody>
          {/* Title and About */}
          <Typography
            variant="h4"
            className="mb-2  text-xl font-poppins"
          >
            <span className="text-customGreen font-medium">{title?.first}</span>{" "}
            <span className="text-customGreenslow font-semibold">{title?.second}</span>
          </Typography>
          <Typography className="font-poppins text-justify mb-2">
            {about}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
              Packge Tour Name
          </h1>
            {packgetour}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          People Join the tour
          </h1>
            {peoplejointour}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Price Package Tour
          </h1>
            {price}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Tour Dates
          </h1>
            {tourdates}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Status Payment
          </h1>
            {statuspayment}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Status Booking
          </h1>
            {statusbooking}
          </Typography>

          <div className="mt-1 mb-3">
          <a href={bookingLink} className="inline-block">
            <Button
              size="md"
              variant="text"
              className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
            >
              Print Invocie !!
            </Button>
          </a>
          </div>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-lg font-semibold text-customGreen">
          Information :
          </h1>
            {information}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookinginformationComponent;
