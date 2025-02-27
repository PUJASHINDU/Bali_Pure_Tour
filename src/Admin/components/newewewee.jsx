import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Typography, Textarea } from "@material-tailwind/react";

const FormTambahPaketTour = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    package_name: "",
    about_package: "",
    program_tour: "",
    price_2_person: "",
    price_3_5_person: "",
    price_6_10_person: "",
    price_11_person: "",
    facility_tour: "",
    contact_pt: "",
    galeries: [],
    Rundown: [{ time: "", description: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 10) {
      alert("Maksimal 10 gambar yang bisa diunggah!");
      return;
    }
    const files = Array.from(e.target.files);
    setFormData({ ...formData, galeries: files });
  };

  const handleAddRundown = () => {
    setFormData({
      ...formData,
      Rundown: [...formData.Rundown, { time: "", description: "" }],
    });
  };

  const handleRundownChange = (index, field, value) => {
    const newRundown = formData.Rundown.map((r, i) =>
      i === index ? { ...r, [field]: value } : r
    );
    setFormData({ ...formData, Rundown: newRundown });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "Rundown") {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (key === "galeries") {
        value.forEach((file) => formDataToSend.append("galeries", file));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/package-tour", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Server Error");

      const result = await response.json();
      alert(result.message);
      navigate(`/FormTambahCardPaketTour?package_name=${encodeURIComponent(formData.package_name)}`);
    } catch (error) {
      alert("Gagal mengirim data!");
      console.error(error);
    }
  };

  return (
    <Card className="p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto mt-6">
      <Typography variant="h4" className="mb-6 text-center text-blue-500 font-semibold">
        Tambah Paket Tour
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nama Paket" name="package_name" onChange={handleChange} />
        <Textarea label="Tentang Paket" name="about_package" onChange={handleChange} />
        <Textarea label="Program Tour" name="program_tour" onChange={handleChange} />
        <div className="grid grid-cols-2 gap-4">
          <Input type="number" label="Harga (2 Orang)" name="price_2_person" onChange={handleChange} />
          <Input type="number" label="Harga (3-5 Orang)" name="price_3_5_person" onChange={handleChange} />
          <Input type="number" label="Harga (6-10 Orang)" name="price_6_10_person" onChange={handleChange} />
          <Input type="number" label="Harga (11+ Orang)" name="price_11_person" onChange={handleChange} />
        </div>
        <Input label="Fasilitas" name="facility_tour" onChange={handleChange} />
        <Input label="Kontak" name="contact_pt" onChange={handleChange} />

        <div className="mt-4">
          <Typography variant="h6">Upload Gambar (Maksimal 10)</Typography>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="mt-2" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {formData.galeries.map((file, index) => (
              <img key={index} src={URL.createObjectURL(file)} alt="Preview" className="w-full h-24 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Typography variant="h6">Rundown</Typography>
          {formData.Rundown.map((r, index) => (
            <div key={index} className="p-3 border rounded-lg mt-2 bg-gray-100">
              <Input label="Waktu" value={r.time} onChange={(e) => handleRundownChange(index, "time", e.target.value)} />
              <Textarea label="Deskripsi" value={r.description} onChange={(e) => handleRundownChange(index, "description", e.target.value)} className="mt-2" />
            </div>
          ))}
          <Button color="blue" onClick={handleAddRundown} className="mt-4">Tambah Rundown</Button>
        </div>

        <Button type="submit" color="green" className="mt-6 w-full text-lg">Simpan Paket</Button>
      </form>
    </Card>
  );
};

export default FormTambahPaketTour;
