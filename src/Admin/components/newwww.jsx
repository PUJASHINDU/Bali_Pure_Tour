import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Typography, Button, Input } from "@material-tailwind/react";

const FormUpdatePaketTour = () => {
  const { id } = useParams();
  const BASE_URL = "http://localhost:5000"; // Pastikan sesuai dengan server

  const [formData, setFormData] = useState({
    package_name: "",
    about_package: "",
    program_tour: "",
    facility_tour: "",
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

  const handleAddRundown = () => {
    setFormData((prevData) => ({
      ...prevData,
      rundown_tour: [...prevData.rundown_tour, { time: "", description: "" }],
    }));
  };

  const handleRemoveRundown = (index) => {
    setFormData((prevData) => {
      const updatedRundown = prevData.rundown_tour.filter((_, i) => i !== index);
      return { ...prevData, rundown_tour: updatedRundown };
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${BASE_URL}/package-tour-update/${id}`, formData);
      alert("Paket berhasil diperbarui!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7">
      <Card className="w-full max-w-screen-sm">
        <CardBody>
          <Typography variant="h4" className="text-gray-800 mb-4">
            Update Paket Tour - {formData.package_name}
          </Typography>

          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : (
            <>
              <div className="mb-4">
                <Typography variant="h6" className="text-gray-700 mb-1">Nama Tour</Typography>
                <Input size="lg" value={formData.package_name} onChange={handleChange} name="package_name" />
              </div>

              <div className="mb-4">
                <Typography variant="h6" className="text-gray-700 mb-1">Rundown Tour</Typography>
                {formData.rundown_tour.length > 0 ? (
                  formData.rundown_tour.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <Input
                        size="lg"
                        value={item.time}
                        onChange={(e) => handleRundownChange(index, "time", e.target.value)}
                        placeholder="Jam (e.g., 08:00)"
                        className="flex-1"
                      />
                      <Input
                        size="lg"
                        value={item.description}
                        onChange={(e) => handleRundownChange(index, "description", e.target.value)}
                        placeholder="Deskripsi Aktivitas"
                        className="flex-1"
                      />
                      {formData.rundown_tour.length > 1 && (
                        <Button size="sm" className="bg-red-500 text-white" onClick={() => handleRemoveRundown(index)}>
                          Hapus
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <Typography variant="small" className="text-gray-500">Tidak ada rundown, silakan tambah.</Typography>
                )}
                <Button size="sm" className="bg-green-500 text-white mt-2" onClick={handleAddRundown}>
                  Tambah Rundown
                </Button>
              </div>

              <Button className="bg-blue-500 text-white w-full mt-4" onClick={handleSubmit}>
                Simpan Update
              </Button>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default FormUpdatePaketTour;
