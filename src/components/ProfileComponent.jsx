import React, { useState } from 'react';
import {
  Input,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'; // Import CloudArrowUpIcon
import userDefaultImg from '../assets/icon/profile.jpg'; // Import gambar default

const ProfileComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false); // State untuk modal upload file
  const [selectedDate, setSelectedDate] = useState({ day: '', month: '', year: '' });
  const [dayPopoverOpen, setDayPopoverOpen] = useState(false);
  const [monthPopoverOpen, setMonthPopoverOpen] = useState(false);
  const [yearPopoverOpen, setYearPopoverOpen] = useState(false);
  const [gender, setGender] = useState('');9
  const [file, setFile] = useState(null);

  // deaful img
  const Image = userDefaultImg;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setIsModalOpen(false); // Tutup modal setelah unggah gambar
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDayChange = (day) => {
    setSelectedDate((prevState) => ({ ...prevState, day }));
    setDayPopoverOpen(false);
  };

  const handleMonthChange = (month) => {
    setSelectedDate((prevState) => ({ ...prevState, month }));
    setMonthPopoverOpen(false);
  };

  const handleYearChange = (year) => {
    setSelectedDate((prevState) => ({ ...prevState, year }));
    setYearPopoverOpen(false);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileButtonClick = () => {
    document.getElementById('file-upload').click();
  };

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="px-4 py-10 container mx-auto">
      <Typography variant="h5" color="blue-gray" className="font-poppins">
        Profile Information
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal mt-1 font-poppins">
        Update your profile information below.
      </Typography>

      <div className="flex flex-col mt-8">
        {/* Bagian Gambar Profil */}
        <div className="mb-6 flex flex-col items-center md:items-start">
          <img
          src={Image}
            alt="Profil"
            className="w-44 h-44 rounded-lg object-cover mb-4"
          />
          <Button onClick={toggleModal} size="sm"
            variant="outlined" // Tombol hanya border
            className="border-gray-600 text-customGreenslow hover:bg-gray-100 font-poppins -mt-4 md:ml-4 lg:ml-7">
            Chage Profile
          </Button>
          <Typography variant="small" className="text-customGreenslow font-normal mt-2 font-poppins">
            <p className='mt-2'> File size: maximum 10 Megabytes (MB).</p>
            <p> Allowed file extensions: .JPG .JPEG .PNG</p>
          </Typography>
        </div>


        {/* Modal untuk Mengunggah Gambar */}
        <Dialog open={isModalOpen} handler={toggleModal}>
          <DialogHeader className="font-poppins text-base">Unggah Gambar Profil Baru</DialogHeader>
          <DialogBody divider>
            <section className="md:w-[70%] w-[50%] md:h-[50vh] max-w-4xl px-8 md:px-0 mx-auto mb-10">
              <div className="relative border-2 border-gray-300 border-dashed rounded-xl p-6 h-full mx-auto">
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 z-50"
                />
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 mx-auto opacity-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <h3 className="mt-2 font-medium">
                    <label htmlFor="image-upload" className="relative cursor-pointer">
                      <span className="text-xl text-gray-800 font-semibold">Drag and drop image here</span>
                      <br />
                      <small className="mb-2 text-gray-400">File supported: JPEG, PNG, GIF</small>
                      <br />
                      <button onClick={handleFileButtonClick} className="px-6 py-3 bg-blue-500 hover:bg-blue-800 rounded text-base font-medium mt-4 text-white">
                        Choose Image
                      </button>
                      <br />
                      <span className="text-sm font-medium text-gray-400">Maximum size: 5MB</span>
                    </label>
                  </h3>
                </div>
              </div>
            </section>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={toggleModal} className="mr-2 font-poppins">
              Cancel
            </Button>
            <Button variant="gradient" color="green" onClick={toggleModal} className="font-poppins">
              Submit
            </Button>
          </DialogFooter>
        </Dialog>


        {/* Form Profil */}
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
              Full Name
            </Typography>
            <Input
              size="lg"
              // value={user?.full_name || ''}
              placeholder="Your Name"
              className="!border-t-blue-gray-200 focus:!border-gray-400"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
              Email
            </Typography>
            <Input
              size="lg"
              // value={user?.email || ''}
              placeholder="Your Email"
              className="!border-t-blue-gray-200 focus:!border-gray-400"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
        </div>

        <div className="w-80">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
            Call Number
          </Typography>
          <Input
            type="tel"
            size="lg"
            // value={user?.phone || ''}
            placeholder="Your Phone Number"
            className="!border-t-blue-gray-200 focus:!border-gray-400"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />
        </div>


        {/* Tanggal Lahir */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-5">
          <div className="w-full md:w-1/5">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
              Day
            </Typography>
            <Popover open={dayPopoverOpen} handler={setDayPopoverOpen} placement="bottom">
              <PopoverHandler>
                <button className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg font-poppins">
                  {selectedDate.day || 'Select Day'}
                </button>
              </PopoverHandler>
              <PopoverContent className="p-4 max-h-48 overflow-y-auto">
                <div className="flex flex-col">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDayChange(day)}
                      className="py-2 px-3 hover:bg-gray-100"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-1/5">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
              Month
            </Typography>
            <Popover open={monthPopoverOpen} handler={setMonthPopoverOpen} placement="bottom">
              <PopoverHandler>
                <button className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg">
                  {selectedDate.month ? months[selectedDate.month - 1] : 'Select Month'}
                </button>
              </PopoverHandler>
              <PopoverContent className="p-4 max-h-48 overflow-y-auto">
                <div className="flex flex-col">
                  {months.map((month, index) => (
                    <button
                      key={index}
                      onClick={() => handleMonthChange(index + 1)}
                      className="py-2 px-3 hover:bg-gray-100"
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-1/5">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
              Year
            </Typography>
            <Popover open={yearPopoverOpen} handler={setYearPopoverOpen} placement="bottom">
              <PopoverHandler>
                <button className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg">
                  {selectedDate.year || 'Select Year'}
                </button>
              </PopoverHandler>
              <PopoverContent className="p-4 max-h-48 overflow-y-auto">
                <div className="flex flex-col">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearChange(year)}
                      className="py-2 px-3 hover:bg-gray-100"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Radio Button Gender */}
        <div className="mt-10">
          <Typography variant="small" color="blue-gray" className="mb-2 font-medium font-poppins">
            Gender
          </Typography>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Famale"
                checked={gender === 'Famale'}
                onChange={handleGenderChange}
                className="mr-2 font-poppins"
              />
              Famale
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={handleGenderChange}
                className="mr-2 font-poppins"
              />
              Male
            </label>
          </div>
        </div>
      </div>

      <div className='flex items-center mt-10'>
        <Button className="w-[60%] md:w-[17%] font-poppins text-sm font-medium ml-1 bg-customGreen">
          Save Profile
        </Button>
      </div>

      {/* Modal Upload File */}
      <Dialog open={isFileModalOpen} handler={() => setIsFileModalOpen(false)}>
        <DialogHeader className='font-poppins text-base'>Upload KTP or Other ID Card</DialogHeader>
        <DialogBody divider>
          <section className="md:w-[70%] w-[99%] md:h-[50vh] max-w-4xl px-8 md:px-0 mx-auto mb-10 ">
            <div className="relative border-2 border-gray-300 border-dashed rounded-xl p-6 h-full mx-auto">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 z-50"
              />
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <h3 className="mt-2 font-medium">
                  <label htmlFor="file-upload" className="relative cursor-pointer">
                    <span className="text-xl text-gray-800 font-semibold">Drag and drop file here</span>
                    <br />
                    <small className="mb-2 text-gray-400">File supported: PDF, XLSX, Image, Scanner</small>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    <br />
                    <button onClick={handleFileButtonClick} className="px-6 py-3 bg-blue-500 hover:bg-blue-800 rounded text-base font-medium mt-4 text-white">
                      Choose File
                    </button>
                    <br />
                    <span className="text-sm font-medium text-gray-400">Maximum size: 5MB</span>
                  </label>
                </h3>
              </div>
            </div>
          </section>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setIsFileModalOpen(false)} className="mr-2 font-poppins">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={() => setIsFileModalOpen(false)} className='font-poppins'>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ProfileComponent;
