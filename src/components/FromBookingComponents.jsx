import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Input,
  Select,
  Option,
  Button,
  Card,
  Typography,
  Popover,
  PopoverHandler,
  CardFooter,
  PopoverContent
} from "@material-tailwind/react";

const FormBookingComponents = () => {

  const location = useLocation();
  const locationState = location.state || {};
  const { packageName: initialPackageName = "Bali Pure Tour" } = locationState;

  const [packageName, setPackageName] = useState(initialPackageName);
  const [numParticipants, setNumParticipants] = useState(2);
  const [priceData, setPriceData] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    // Fetch package data from API
    const fetchPackageData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-packages");
        const packages = response.data;
        const selectedPackage = packages.find(pkg => pkg.package_name === packageName);
        setPriceData(selectedPackage);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };
    fetchPackageData();
  }, [packageName]);

  useEffect(() => {
    if (priceData) {
      if (numParticipants === 2) {
        setSelectedPrice(priceData.price_2_person);
      } else if (numParticipants >= 3 && numParticipants <= 5) {
        setSelectedPrice(priceData.price_3_5_person);
      } else if (numParticipants >= 6 && numParticipants <= 10) {
        setSelectedPrice(priceData.price_6_10_person);
      } else {
        setSelectedPrice(priceData.price_11_person);
      }
    }
  }, [numParticipants, priceData]);


  const [checkin, setCheckin] = useState({ day: '', month: '', year: '' });
  const [checkout, setCheckout] = useState({ day: '', month: '', year: '' });

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);

  const [checkinDayPopoverOpen, setCheckinDayPopoverOpen] = useState(false);
  const [checkinMonthPopoverOpen, setCheckinMonthPopoverOpen] = useState(false);
  const [checkinYearPopoverOpen, setCheckinYearPopoverOpen] = useState(false);


  const handleCheckinChange = (field, value) => {
    setCheckin({ ...checkin, [field]: value });
  };


  return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-xl p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold font-poppins text-center mb-6">Form Booking</h2>

        <div className="grid grid-cols-1 gap-4 mb-6 font-poppins">
          <Typography variant="small" color="blue-gray" className="font-medium font-poppins -mb-2 ml-1 text-base">Full Name</Typography>
          <Input placeholder="Enter full name"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900
          font-poppins text-base text-customGreenslow  tracking-wider"
            labelProps={{ className: "before:content-none after:content-none" }}
          />

          <Typography variant="small" color="blue-gray" className="font-medium font-poppins -mb-2 ml-1 text-base">Your Email</Typography>
          <Input placeholder="Enter Email"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900
          font-poppins text-base text-customGreenslow  tracking-wider"
            labelProps={{ className: "before:content-none after:content-none" }}
          />


          <Typography variant="small" color="blue-gray" className="font-medium font-poppins -mb-2 ml-1 text-base" >Phone Number</Typography>
          <Input placeholder="Enter Phone Number"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900
          font-poppins text-base text-customGreenslow  tracking-wider"
            labelProps={{ className: "before:content-none after:content-none" }}
          />

        </div>

        <h3 className="font-medium font-poppins mb-2 text-base">Details Booking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select
            value={packageName}
            onChange={setPackageName}
            className="font-poppins border border-gray-400 rounded-md focus:outline-none focus:ring-0 focus:border-gray-400"
            labelProps={{ className: "before:content-none after:content-none" }}
          >
            <Option value="Bali Pure Tour">Bali Pure Tour</Option>
            <Option value="Bali Pure Trek">Bali Pure Trek</Option>
            <Option value="Bali Pure Cook">Bali Pure Cook</Option>
            <Option value="Bali Pure Trek Bikes">Bali Pure Trek Bikes</Option>
          </Select>

          <Select
            value={numParticipants.toString()}
            onChange={(val) => setNumParticipants(parseInt(val))}
            className="font-poppins border border-gray-400 rounded-md focus:outline-none focus:ring-0 focus:border-gray-400"
            labelProps={{ className: "before:content-none after:content-none" }}
          >
            <Option value="2">2 Person</Option>
            <Option value="5">5 Person</Option>
            <Option value="10">10 Person</Option>
            <Option value="11">11 Person</Option>
          </Select>
        </div>



        {/* Bagian Check-in dan Check-out */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium text-base font-poppins">Check-in Date</Typography>
            <div className="flex gap-3">
              <Popover open={checkinDayPopoverOpen} handler={setCheckinDayPopoverOpen} placement="bottom">
                <PopoverHandler>
                  <button className="w-full max-w-[70px] text-left px-3 py-2 border border-gray-300 rounded-lg font-poppins">{checkin.day || 'Day'}</button>
                </PopoverHandler>
                <PopoverContent className="p-4 max-h-48 overflow-y-auto">
                  <div className="flex flex-col">
                    {days.map((day) => (
                      <button key={day} onClick={() => handleCheckinChange('day', day)} className="py-2 px-3 hover:bg-gray-100">{day}</button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={checkinMonthPopoverOpen} handler={setCheckinMonthPopoverOpen} placement="bottom">
                <PopoverHandler>
                  <button className="w-full max-w-[140px] text-left px-3 py-2 border border-gray-300 rounded-lg font-poppins">{checkin.month || 'Month'}</button>
                </PopoverHandler>
                <PopoverContent className="p-4 max-h-48 overflow-y-auto">
                  <div className="flex flex-col">
                    {months.map((month) => (
                      <button key={month} onClick={() => handleCheckinChange('month', month)} className="py-2 px-3 hover:bg-gray-100">{month}</button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover open={checkinYearPopoverOpen} handler={setCheckinYearPopoverOpen} placement="bottom">
                <PopoverHandler>
                  <button className="w-full max-w-[90px] text-left px-3 py-2 border border-gray-300 rounded-lg font-poppins">{checkin.year || 'Year'}</button>
                </PopoverHandler>
                <PopoverContent className="p-4 max-h-48 overflow-y-auto">
                  <div className="flex flex-col">
                    {years.map((year) => (
                      <button key={year} onClick={() => handleCheckinChange('year', year)} className="py-2 px-3 hover:bg-gray-100">{year}</button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium text-base font-poppins">The price that must be paid</Typography>
          <div className="mb-4 border-gray-400 font-poppins font-extrabold text-customGreen text-base tracking-wider p-2 border rounded-md">
            $ {selectedPrice.toFixed(2)}
          </div>

          <Typography variant="small" className="mb-2 font-light mt-3 ml-1 text-sm font-poppins text-customGreenslow">
            Price automatically adjusts based on the
            number of <span className='text-customGreen font-semibold'>people joining the tour</span>.
          </Typography>
        </div>


        {/* Payment Method Button */}
        <CardFooter className="pt-0 flex justify-center items-center">
          <Button
            size="lg"
            variant="text"
            className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white normal-case w-80 text-center justify-center mt-4"
          // onClick={() => {
          //   console.log("Updated Data:", formData);
          //   window.location.href = updateLink;
          // }}
          >
            Booking Now !!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormBookingComponents;
