
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { Input, Button, Card, Typography, Textarea } from "@material-tailwind/react";
import BerhasilTambahModal from "./ModalBerhasilTambahPaketTour";
const FormTambahPaketTour = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    package_name: "",
    about_package: "",
    program_tour: [""],
    price_2_person: "",
    price_3_5_person: "",
    price_6_10_person: "",
    price_11_person: "",
    contact_pt: "",
    galeries: [],
    facility_tour: [""],
    Rundown: [{ time: "", description: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };





  // Handle Upload Gambar
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      galeries: [...prevData.galeries, ...files].slice(0, 10), // Maksimal 10 gambar
    }));
  };

  // Hapus gambar
  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      galeries: prevData.galeries.filter((_, i) => i !== index),
    }));
  };

  // Tambah/Hapus Rundown
  const handleAddRundown = () => {
    setFormData((prevData) => ({
      ...prevData,
      Rundown: [...prevData.Rundown, { time: "", description: "" }],
    }));
  };

  // const handleRemoveRundown = (index) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     Rundown: prevData.Rundown.filter((_, i) => i !== index),
  //   }));
  // };

  const handleRemoveRundown = (index) => {
    setFormData((prevData) => {
      const updatedRundown = prevData.Rundown.filter((_, i) => i !== index);

      // Jangan biarkan array kosong, minimal harus ada 1 form
      return {
        ...prevData,
        Rundown: updatedRundown.length > 0 ? updatedRundown : [""],
      };
    });
  };


  // Tambah/Hapus Fasilitas
  const handleAddFacility = () => {
    setFormData((prevData) => ({
      ...prevData,
      facility_tour: [...prevData.facility_tour, ""], // Tambahkan string kosong
    }));
  };


  const handleFacilityChange = (index, value) => {
    const newFacilityTour = [...formData.facility_tour];
    newFacilityTour[index] = value;
    setFormData({ ...formData, facility_tour: newFacilityTour });
  };


  const handleRemoveFacility = (index) => {
    setFormData((prevData) => {
      const updatedFacilityTour = prevData.facility_tour.filter((_, i) => i !== index);

      // Jangan biarkan array kosong, minimal harus ada 1 form
      return {
        ...prevData,
        facility_tour: updatedFacilityTour.length > 0 ? updatedFacilityTour : [""],
      };
    });
  };


  // Tambah/Hapus Fasilitas
  const handleAddProgram = () => {
    setFormData((prevData) => ({
      ...prevData,
      program_tour: [...prevData.program_tour, ""], // Tambahkan string kosong
    }));
  };


  const handleProgramChange = (index, value) => {
    const newProgramTour = [...formData.program_tour];
    newProgramTour[index] = value;
    setFormData({ ...formData, program_tour: newProgramTour });
  };


  const handleRemoveProgram = (index) => {
    setFormData((prevData) => {
      const updatedProgramTour = prevData.program_tour.filter((_, i) => i !== index);

      // Jangan biarkan form kosong sepenuhnya
      return {
        ...prevData,
        program_tour: updatedProgramTour.length > 0 ? updatedProgramTour : [""],
      };
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.package_name || !formData.about_package || formData.facility_tour.length === 0) {
      alert("Nama Paket, Deskripsi, dan Fasilitas tidak boleh kosong!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("package_name", formData.package_name);
    formDataToSend.append("about_package", formData.about_package);
    formDataToSend.append("price_2_person", formData.price_2_person);
    formDataToSend.append("price_3_5_person", formData.price_3_5_person);
    formDataToSend.append("price_6_10_person", formData.price_6_10_person);
    formDataToSend.append("price_11_person", formData.price_11_person);
    formDataToSend.append("contact_pt", formData.contact_pt);

    // Kirim array satu per satu (bukan dalam bentuk JSON.stringify)
    formData.program_tour.forEach((program) => {
      formDataToSend.append("program_tour[]", program);
    });

    formData.facility_tour.forEach((facility) => {
      formDataToSend.append("facility_tour[]", facility);
    });

    formData.Rundown.forEach((rundown, index) => {
      formDataToSend.append(`Rundown[${index}][time]`, rundown.time);
      formDataToSend.append(`Rundown[${index}][description]`, rundown.description);
    });

    formData.galeries.forEach((file) => {
      formDataToSend.append("galeries", file);
    });

    try {
      const response = await fetch("http://localhost:5000/package-tour", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Server Error");
      }

      setShowModal(true);
      setTimeout(() => {
        navigate(`/FormTambahCardPaketTour?package_name=${encodeURIComponent(formData.package_name)}`);
      }, 7000);
    } catch (error) {
      alert("Gagal mengirim data! Cek konsol untuk detail.");
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate(`/FormTambahCardPaketTour`);
    }, 500);
  };


  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <div className="mb-4 sm:mt-10 lg:mt-6">
          <Typography variant="h4" className="text-customGreen font-poppins mb-1" >
            Hallo Admin  🙌
          </Typography>
          <Typography variant="h4" className="text-customGreenslow font-medium font-poppins text-sm" >
            Silahkan update deskripsi detail peket tour, update dengan jelas dan sesuai yaa !
          </Typography>
        </div>

        <div className="mb-4 ">
          <Typography variant="h6" className="font-poppins font-semibold mb-1 text-customGreenslow">Nama Tour</Typography>
          <Input name="package_name" value={formData.package_name} onChange={handleChange}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins max-w-md"
            labelProps={{
              className: "before:content-none after:content-none",
            }} />
        </div>

        <div className="mb-4">
          <Typography variant="h6" className="font-poppins font-semibold mb-1 text-customGreenslow">Deskripsi</Typography>
          <Textarea name="about_package"
            value={formData.about_package}
            onChange={handleChange}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
            labelProps={{
              className: "before:content-none after:content-none",
            }} />
        </div>

        {/* Program Tour */}
        {/* <div className="mb-4">
          <Typography variant="h6">Program Tour</Typography>
          {formData.program_tour.map((program, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                placeholder="Program Tour"
                value={program}
                onChange={(e) => handleProgramChange(index, e.target.value)}
              />
              <Button size="sm" color="red" onClick={() => handleRemoveProgram(index)}>Hapus</Button>
            </div>
          ))}
          <Button size="sm" color="green" onClick={handleAddProgram}>Tambah Program Tour</Button>
        </div> */}

        {/* Program Tour */}
        <div className="mb-4">
          <Typography variant="h6" className="text-customGreenslow mb-3 font-poppins">
            Program Tour
          </Typography>
          {formData.program_tour.map((program, index) => (
            <div key={index} className="flex items-center gap-2 mb-2 font-poppins">
              <Input
                size="lg"
                value={program}
                onChange={(e) => handleProgramChange(index, e.target.value)}
                className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md font-poppins"
                placeholder="Masukkan program"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {index !== 0 && (
                <Button
                  size="sm"
                  className="bg-customred text-white font-poppins normal-case"
                  onClick={() => handleRemoveProgram(index)}
                >
                  Hapus
                </Button>
              )}
            </div>
          ))}
          <Button
            size="sm"
            className="bg-customGreen text-white font-poppins mb-5 normal-case"
            onClick={handleAddProgram}
          >
            Tambah Program
          </Button>
        </div>


        <Typography variant="h6" className="font-poppins font-semibold mb-1 text-customGreenslow">Harga Paket Tour</Typography>
        <div className="grid grid-cols-2 gap-4 mb-4 font-poppins">
          {[
            { label: "2 Person", name: "price_2_person" },
            { label: "3-5 Person", name: "price_3_5_person" },
            { label: "6-10 Person", name: "price_6_10_person" },
            { label: "11+ Person", name: "price_11_person" },
          ].map((item, index) => (
            <div key={index}>
              <Typography variant="small">{item.label}</Typography>
              <Input name={item.name} value={formData[item.name]} onChange={handleChange} className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
                labelProps={{
                  className: "before:content-none after:content-none",
                }} />
            </div>
          ))}
        </div>

        {/* Upload Gambar */}
        <div className="mb-4">
          <Typography variant="h6" className="text-customGreen font-poppins mb-1 mt-1 " >
            Upload Image
          </Typography>
          <Typography variant="h4" className="text-customGreenslow font-medium font-poppins text-xs" >
            Silahkan upload image dengan format jpg or png maxsimal 10 image!
          </Typography>
          <label className="mt-3 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="text-center">
              <svg className="w-10 h-10 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16l4 4m0 0l4-4m-4 4V4" />
              </svg>
              <p className="text-sm text-customGreenslow font-poppins">Klik untuk upload</p>
            </div>
          </label>
          {formData.galeries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {formData.galeries.map((file, index) => (
                <div key={index} className="relative group">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-24 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <button onClick={() => handleRemoveImage(index)} className="bg-red-500 text-white p-2 rounded-full">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fasilitas
        <div className="mb-4">
          <Typography variant="h6">Fasilitas</Typography>
          {formData.facility_tour.map((facility, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input placeholder="Fasilitas" value={facility} onChange={(e) => handleFacilityChange(index, e.target.value)} />
              <Button size="sm" color="red" onClick={() => handleRemoveFacility(index)}>Hapus</Button>
            </div>
          ))}
          <Button size="sm" color="green" onClick={handleAddFacility}>Tambah Fasilitas</Button>
        </div> */}


        {/* Facility Tour */}
        {/* Facility Tour */}
        <div className="mb-4">
          <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">
            Facility Tour
          </Typography>
          {formData.facility_tour.map((facility, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                size="lg"
                value={facility}
                onChange={(e) => handleFacilityChange(index, e.target.value)}
                placeholder="Masukkan fasilitas"
                className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {index !== 0 && (
                <Button
                  size="sm"
                  className="bg-customred text-white font-poppins normal-case"
                  onClick={() => handleRemoveFacility(index)}
                >
                  Hapus
                </Button>
              )}
            </div>
          ))}
          <Button
            size="sm"
            className="bg-customGreen text-white font-poppins normal-case"
            onClick={handleAddFacility}
          >
            Tambah Facility
          </Button>
        </div>



        {/* Rundown
        <div className="mb-4">
          <Typography variant="h6">Rundown</Typography>
          {formData.Rundown.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
              placeholder="Waktu"
              value={item.time}
              onChange={(e) => { const newRundown = [...formData.Rundown]; newRundown[index].time = e.target.value; setFormData({ ...formData, Rundown: newRundown }); }} />

              <Input
              placeholder="Deskripsi"
              value={item.description}
              onChange={(e) => { const newRundown = [...formData.Rundown]; newRundown[index].description = e.target.value; setFormData({ ...formData, Rundown: newRundown }); }} />
              <Button size="sm" color="red" onClick={() => handleRemoveRundown(index)}>Hapus</Button>
            </div>
          ))}
          <Button size="sm" color="green" onClick={handleAddRundown}>Tambah Rundown</Button>
        </div> */}

        {/* Rundown Tour */}
        <div className="mb-4">
          <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">
            Rundown Tour
          </Typography>

          {formData.Rundown.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <Input
                size="lg"
                placeholder="Jam (e.g., 08:00)"
                value={item.time}
                onChange={(e) => { const newRundown = [...formData.Rundown]; newRundown[index].time = e.target.value; setFormData({ ...formData, Rundown: newRundown }); }}
                className="flex-1 !border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              <Input
                size="lg"
                placeholder="Deskripsi"
                value={item.description}
                onChange={(e) => { const newRundown = [...formData.Rundown]; newRundown[index].description = e.target.value; setFormData({ ...formData, Rundown: newRundown }); }}
                className="flex-1 !border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                labelProps={{ className: "before:content-none after:content-none" }}
              />

              {/* Tampilkan tombol "Hapus" hanya untuk item yang baru ditambahkan */}
              {index !== 0 && (
                <Button
                  size="sm"
                  className="bg-customred text-white font-poppins normal-case"
                  onClick={() => handleRemoveRundown(index)}// Ubah sesuai fungsi yang ada
                >
                  Hapus
                </Button>
              )}
            </div>
          ))}

          <Button
            size="sm"
            className="bg-customGreen text-white font-poppins mb-2 normal-case"
            onClick={handleAddRundown}
          >
            Tambah Rundown
          </Button>
        </div>

        <div className="mb-4">
          <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">Contact Pt Bali Pure Tour</Typography>
          <Input name="contact_pt" onChange={handleChange}
            className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md max-w-md"
            labelProps={{
              className: "before:content-none after:content-none",
            }} />
        </div>

        <div className="pt-0 flex justify-center items-center mt-5">
        <Button
          size="md"
          variant="text"
          className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white normal-case w-80 text-center justify-center"
          onClick={handleSubmit}
        >
          Simpan Paket Tour !!
        </Button>

        {showModal && <BerhasilTambahModal onClose={handleCloseModal} />}
        </div>

      </Card>


    </div>
  );
};

export default FormTambahPaketTour;
