import React, { useState } from 'react';
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
  PopoverContent } from "@material-tailwind/react";

const FormBookingComponents = () => {
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
        <h2 className="text-2xl font-semibold text-center mb-6">Form Booking</h2>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <Typography variant="small" color="blue-gray" className="font-medium font-poppins -mb-2 ml-1 text-base">Full Name</Typography>
          <Input label="Full Name" placeholder="Enter full name" />

          <Typography variant="small" color="blue-gray" className="font-medium font-poppins -mb-2 ml-1 text-base">Your Email</Typography>
          <Input label="Email Address" placeholder="email address" />

          <Typography variant="small" color="blue-gray" className="font-medium font-poppins -mb-2 ml-1 text-base">Phone Number</Typography>
          <Input label="Phone Number" placeholder="Enter phone number" />
        </div>

        <h3 className="text-lg font-medium mb-4 font-poppins">Details Booking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select label="Packge Tour">
            <Option>Bali Pure Tour</Option>
            <Option>Bali Pure Trek</Option>
            <Option>Bali Pure Cook</Option>
            <Option>Bali Pure Treek Bikes</Option>
          </Select>
          <Select label="People Join the tour">
            <Option>2 Person</Option>
            <Option>5 Person</Option>
            <Option>10 Person</Option>
            <Option>11 Person</Option>
          </Select>
        </div>


        {/* Bagian Check-in dan Check-out */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium text-base font-poppins">Check-in Date</Typography>
            <div className="flex gap-3">
              <Popover open={checkinDayPopoverOpen} handler={setCheckinDayPopoverOpen} placement="bottom">
                <PopoverHandler>
                  <button className="w-full max-w-[70px] text-left px-3 py-2 border border-gray-300 rounded-lg">{checkin.day || 'Day'}</button>
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
                  <button className="w-full max-w-[140px] text-left px-3 py-2 border border-gray-300 rounded-lg">{checkin.month || 'Month'}</button>
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
                  <button className="w-full max-w-[90px] text-left px-3 py-2 border border-gray-300 rounded-lg">{checkin.year || 'Year'}</button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Price" placeholder="Enter total price" />
            </div>
            <Typography variant="small"  className="mb-2 font-light mt-3 ml-1 text-sm font-poppins text-customGreenslow">Price automatically adjusts based on the
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
