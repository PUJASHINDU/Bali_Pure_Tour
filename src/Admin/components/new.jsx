

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { Input, Button, Card, Typography, Textarea } from "@material-tailwind/react";

const FormTambahPaketTour = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    package_name: "",
    about_package: "",
    program_tour: [],
    price_2_person: "",
    price_3_5_person: "",
    price_6_10_person: "",
    price_11_person: "",
    contact_pt: "",
    galeries: [],
    facilities: [],
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

  const handleRemoveRundown = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      Rundown: prevData.Rundown.filter((_, i) => i !== index),
    }));
  };

  // Tambah/Hapus Fasilitas
  const handleAddFacility = () => {
    setFormData((prevData) => ({
      ...prevData,
      facilities: [...prevData.facilities, ""],
    }));
  };

  const handleFacilityChange = (index, value) => {
    const newFacilities = [...formData.facilities];
    newFacilities[index] = value;
    setFormData({ ...formData, facilities: newFacilities });
  };

  const handleRemoveFacility = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      facilities: prevData.facilities.filter((_, i) => i !== index),
    }));
  };

  // Tambah/Hapus Fasilitas
  const handleAddProgram = () => {
    setFormData((prevData) => ({
      ...prevData,
      program_tour: [...prevData.program_tour, ""],
    }));
  };

  const handleProgramChange = (index, value) => {
    const newprogram_tour = [...formData.program_tour];
    newprogram_tour[index] = value;
    setFormData({ ...formData, program_tour: newprogram_tour });
  };

  const handleRemoveProgram = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      program_tour: prevData.program_tour.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

  // Validasi agar tidak mengirim data kosong
  if (!formData.package_name || !formData.about_package || formData.facilities.length === 0) {
    alert("Nama Paket, Deskripsi, dan Fasilitas tidak boleh kosong!");
    return;
  }

  // Data yang akan dikirim
  const payload = {
    package_name: formData.package_name,
    about_package: formData.about_package,
    program_tour: formData.program_tour, // Program Tour dikirim sebagai array
    price_2_person: Number(formData.price_2_person),
    price_3_5_person: Number(formData.price_3_5_person),
    price_6_10_person: Number(formData.price_6_10_person),
    price_11_person: Number(formData.price_11_person),
    facility_tour: formData.facilities, // Ubah 'facilities' jadi 'facility_tour' agar cocok dengan backend
    contact_pt: formData.contact_pt,
    galeries: formData.galeries, // Kirim gambar langsung sebagai array
    Rundown: formData.Rundown.map((item) => ({
      time: item.time,
      description: item.description,
    })),
  };

  try {
    const response = await fetch("http://localhost:5000/package-tour", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Server Error");
    }

    const result = await response.json();
    alert(result.message);
    navigate(`/FormTambahCardPaketTour?package_name=${encodeURIComponent(formData.package_name)}`);
  } catch (error) {
    alert("Gagal mengirim data! Cek konsol untuk detail.");
    console.error("Error:", error);
  }
  };







  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <Typography variant="h4" className="text-green-700 font-semibold mb-4">
          Tambah Paket Tour
        </Typography>

        <div className="mb-4">
          <Typography variant="h6">Nama Tour</Typography>
          <Input name="package_name" value={formData.package_name} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <Typography variant="h6">Deskripsi</Typography>
          <Textarea name="about_package" value={formData.about_package} onChange={handleChange} />
        </div>

        {/* Program Tour */}
        <div className="mb-4">
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
        </div>



        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: "2 Person", name: "price_2_person" },
            { label: "3-5 Person", name: "price_3_5_person" },
            { label: "6-10 Person", name: "price_6_10_person" },
            { label: "11+ Person", name: "price_11_person" },
          ].map((item, index) => (
            <div key={index}>
              <Typography variant="small">{item.label}</Typography>
              <Input name={item.name} value={formData[item.name]} onChange={handleChange} />
            </div>
          ))}
        </div>

        {/* Upload Gambar */}
        <div className="mb-4">
          <Typography variant="h6">Upload Gambar (Maksimal 10)</Typography>
          <label className="mt-3 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="text-center">
              <svg className="w-10 h-10 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16l4 4m0 0l4-4m-4 4V4" />
              </svg>
              <p className="text-sm text-gray-600">Klik untuk upload</p>
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

        {/* Fasilitas */}
        <div className="mb-4">
          <Typography variant="h6">Fasilitas</Typography>
          {formData.facilities.map((facility, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input placeholder="Fasilitas" value={facility} onChange={(e) => handleFacilityChange(index, e.target.value)} />
              <Button size="sm" color="red" onClick={() => handleRemoveFacility(index)}>Hapus</Button>
            </div>
          ))}
          <Button size="sm" color="green" onClick={handleAddFacility}>Tambah Fasilitas</Button>
        </div>



        {/* Rundown */}
        <div className="mb-4">
          <Typography variant="h6">Rundown</Typography>
          {formData.Rundown.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input placeholder="Waktu" value={item.time} onChange={(e) => { const newRundown = [...formData.Rundown]; newRundown[index].time = e.target.value; setFormData({ ...formData, Rundown: newRundown }); }} />
              <Input placeholder="Deskripsi" value={item.description} onChange={(e) => { const newRundown = [...formData.Rundown]; newRundown[index].description = e.target.value; setFormData({ ...formData, Rundown: newRundown }); }} />
              <Button size="sm" color="red" onClick={() => handleRemoveRundown(index)}>Hapus</Button>
            </div>
          ))}
          <Button size="sm" color="green" onClick={handleAddRundown}>Tambah Rundown</Button>
        </div>

        <div className="mb-4">
          <Typography variant="h6">Contact Pt Bali Pure Tour</Typography>
          <Input label="Kontak" name="contact_pt" onChange={handleChange} />
        </div>


        <Button fullWidth color="green" onClick={handleSubmit}>Simpan Paket</Button>
      </Card>
    </div>
  );
};

export default FormTambahPaketTour;
