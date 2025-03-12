import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Typography, Button, Input, CardFooter } from "@material-tailwind/react";
import BerhasilUpdateModal from "./ModalBerhasilUpdatePaketTour copy";
import FieldModal from "./ModalGagal";


const FormUpdatePaketTour = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { id } = useParams();
  const BASE_URL = "http://localhost:5000"; // Pastikan sesuai dengan server

  const [formData, setFormData] = useState({
    package_name: "",
    about_package: "",
    program_tour: [],
    facility_tour: [],
    contact_pt: "",
    price_2_person: "",
    price_3_5_person: "",
    price_6_10_person: "",
    price_11_person: "",
    rundown_tour: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTourData();
  }, [id]);

  const fetchTourData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/package-tour/${id}`);
      const tour = response.data;

      if (!tour) throw new Error("Data paket tour tidak ditemukan!");

      setFormData({
        ...tour,
        program_tour: tour.program_tour ? tour.program_tour.split(". ").map((item) => ({ text: item })) : [],
        facility_tour: tour.facility_tour ? tour.facility_tour.split(". ").map((item) => ({ text: item })) : [],
        rundown_tour: [],
      });

      // Fetch rundown dari API yang sama dengan DetailBaliPureTour
      const rundownResponse = await axios.get(`${BASE_URL}/tour/rundown/${id}`);
      setFormData((prevData) => ({
        ...prevData,
        rundown_tour: rundownResponse.data.map((item) => ({
          time: item.time || "",
          description: item.description || "",
        })),
      }));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRundownChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedRundown = [...prevData.rundown_tour];
      updatedRundown[index] = { ...updatedRundown[index], [field]: value };
      return { ...prevData, rundown_tour: updatedRundown };
    });
  };

  const handleProgramChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedProgram = [...prevData.program_tour];
      updatedProgram[index][field] = value;
      return { ...prevData, program_tour: updatedProgram };
    });
  };

  const handleFacilityChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedFacility = [...prevData.facility_tour];
      updatedFacility[index][field] = value;
      return { ...prevData, facility_tour: updatedFacility };
    });
  };



  const handleAddRundown = () => {
    setFormData((prevData) => ({
      ...prevData,
      rundown_tour: [...prevData.rundown_tour, { time: "", description: "", isNew: true }],
    }));
  };

  const handleAddProgram = () => {
    setFormData((prevData) => ({
      ...prevData,
      program_tour: [...prevData.program_tour, { time: "", description: "", isNew: true }],
    }));
  };

  const handleAddFacility = () => {
    setFormData((prevData) => ({
      ...prevData,
      facility_tour: [...prevData.facility_tour, { time: "", description: "", isNew: true }],
    }));
  };


  const handleRemoveRundown = (index) => {
    setFormData((prevData) => {
      const updatedRundown = prevData.rundown_tour.filter((_, i) => i !== index);
      return { ...prevData, rundown_tour: updatedRundown };
    });
  };

  const handleRemoveProgram = (index) => {
    setFormData((prevData) => {
      const updatedProgram = prevData.program_tour.filter((_, i) => i !== index);
      return { ...prevData, program_tour: updatedProgram };
    });
  };


  const handleRemoveFacility = (index) => {
    setFormData((prevData) => {
      const updatedFacility = prevData.facility_tour.filter((_, i) => i !== index);
      return { ...prevData, facility_tour: updatedFacility };
    });
  };


  const handleSubmit = async () => {
    const formattedData = {
      ...formData,
      program_tour: formData.program_tour.map(item => item.text).join(". "),
      facility_tour: formData.facility_tour.map(item => item.text).join(". "),
      Rundown: formData.rundown_tour, // Pastikan nama ini sesuai dengan yang ada di database
    };

    console.log("Data yang dikirim ke server:", formattedData); // Debugging

    try {
      await axios.put(`${BASE_URL}/package-tour-update/${id}`, formattedData);
      setShowModal(true); // Tampilkan modal setelah berhasil update
      setTimeout(() => {
        setShowModal(false);
        navigate(`/AdminDashboardpage`);
      }, 2000); // ⏳ Modal tampil 3 detik sebelum redirect
    } catch (error) {
      setShowErrorModal(true);
    }
  };


  const handleRemoveListItem = (field, index) => {
    setFormData((prevData) => {
      const updatedList = prevData[field].filter((_, i) => i !== index);
      return { ...prevData, [field]: updatedList };
    });
  };


  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7 overflow-hidden">
      <Card className="w-full max-w-screen-sm">

        <CardBody>
          <div className="mb-4 sm:mt-10 lg:mt-6">
            <Typography variant="h4" className="text-customGreenslow  font-poppins" >
              Hallo Admin  🙌
            </Typography>
            <Typography variant="h4" className="text-customGreenslow font-medium font-poppins text-sm" >
              Silahkan update deskripsi detail peket tour, update dengan jelas dan sesuai yaa !
            </Typography>
          </div>

          {/* Nama Tour */}
          <div className="mb-4">
            <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">
              Nama Tour
            </Typography>
            <Input
              size="lg"
              value={formData.package_name} onChange={handleChange} name="package_name"
              className="!border !border-gray-300 focus:!border-customGreen focus:outline-none rounded-md"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* About */}
          <div className="mb-4">
            <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">
              About
            </Typography>
            <Input
              size="lg"
              value={formData.about_package}
              onChange={handleChange}
              name="about_package"
              className="!border !border-gray-300 focus:!border-gray-500 focus:outline-none !rounded-md"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Program Tour */}
          <div className="mb-4">
            <Typography variant="h6" className="text-customGreenslow mb-3 font-poppins">
              Program Tour
            </Typography>
            {formData.program_tour.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2 font-poppins">
                <Input
                  size="lg"
                  value={item.text} // Pastikan ini benar
                  onChange={(e) =>
                    handleProgramChange(index, "text", e.target.value)
                  }

                  className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md font-poppins"
                  placeholder="Masukkan program"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {item.isNew && (
                  <Button
                    size="sm"
                    className="bg-customred text-white font-poppins normal-case"
                    onClick={() => handleRemoveProgram(index)} // Ubah sesuai fungsi yang ada
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}
            <Button
              size="sm"
              className="bg-customGreen text-white font-poppins mb-5 normal-case"
              onClick={() => handleAddProgram("program_tour", { text: "" })}
            >
              Tambah Program
            </Button>
          </div>


          {/* Rundown Tour */}
          {/* Rundown Tour */}
          <div className="mb-4">
            <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">
              Rundown Tour
            </Typography>

            {formData.rundown_tour.length > 0 && formData.rundown_tour.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <Input
                  size="lg"
                  value={item.time}
                  onChange={(e) => handleRundownChange(index, "time", e.target.value)}
                  placeholder="Jam (e.g., 08:00)"
                  className="flex-1 !border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                  labelProps={{ className: "before:content-none after:content-none" }}
                />
                <Input
                  size="lg"
                  value={item.description}
                  onChange={(e) => handleRundownChange(index, "description", e.target.value)}
                  placeholder="Aktivitas"
                  className="flex-1 !border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                  labelProps={{ className: "before:content-none after:content-none" }}
                />

                {/* Tampilkan tombol "Hapus" hanya untuk item yang baru ditambahkan */}
                {item.isNew && (
                  <Button
                    size="sm"
                    className="bg-customred text-white font-poppins normal-case"
                    onClick={() => handleRemoveRundown(index)} // Ubah sesuai fungsi yang ada
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}

            <Button
              size="sm"
              className="bg-customGreen text-white font-poppins mb-5 normal-case"
              onClick={() =>
                handleAddRundown("rundown_tour", { time: "", description: "", isNew: true }) // Tambahkan isNew: true
              }
            >
              Tambah Rundown
            </Button>
          </div>



          {/* Facility Tour */}
          <div className="mb-4">
            <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">
              Facility Tour
            </Typography>
            {formData.facility_tour.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  size="lg"
                  value={item.text}
                  onChange={(e) =>
                    handleFacilityChange(index, "text", e.target.value)
                  }

                  placeholder="Masukkan fasilitas"
                  className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {item.isNew && (
                  <Button
                    size="sm"
                    className="bg-customred text-white font-poppins normal-case"
                    onClick={() => handleRemoveFacility(index)} // Ubah sesuai fungsi yang ada
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}
            <Button
              size="sm"
              className="bg-customGreen text-white font-poppins  normal-case"
              onClick={() => handleAddFacility("facility_tour", { text: "" })}
            >
              Tambah Facility
            </Button>
          </div>
          {/* Form Price */}

          {/* Harga Tour */}
          <div className="mb- mt-6">
            <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins" >
              Price Tour
            </Typography>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
              {[
                { label: "2 Person", name: "price_2_person", value: formData.price_2_person },
                { label: "3-5 Person", name: "price_3_5_person", value: formData.price_3_5_person },
                { label: "6-10 Person", name: "price_6_10_person", value: formData.price_6_10_person },
                { label: "11+ Person", name: "price_11_person", value: formData.price_11_person },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-start">
                  <Typography variant="small" className="text-gray-600 font-poppins mb-1 font-semibold">
                    {item.label}
                  </Typography>
                  <Input
                    size="lg"
                    value={`${item.value}`}
                    onChange={(e) => handleChange({ target: { name: item.name, value: e.target.value } })}
                    name={item.name}
                    className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md w-full max-w-[120px] font-poppins font-bold text-gray-700"
                    placeholder={`Harga untuk ${item.label}`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </CardBody>

        <CardFooter className="pt-0 flex justify-center items-center">
          <Button
            size="md"
            variant="text"
            className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white normal-case w-80 text-center justify-center"
            onClick={handleSubmit}
          >
            Simpan Update !!
          </Button>
          {showModal && <BerhasilUpdateModal onClose={() => setShowModal(false)} />}
          {showErrorModal && <FieldModal onClose={() => setShowErrorModal(false)} />}
        </CardFooter>

      </Card>
    </div>
  );
};

export default FormUpdatePaketTour;
