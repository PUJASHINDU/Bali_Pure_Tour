import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
 import image from '../../assets/pure tour/Bannerpuretour.jpg'
  import close from '../../assets/icon/close.png'

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

const FormUpdatePaketTour = ({
  title,
  about,
  programTour = [],
  rundownTour = [],
  facilityTour = [],
  updateLink,
}) => {
  const [formData, setFormData] = React.useState({
    title: title || "",
    about: about || "",
    programTour: programTour.map((item) => ({ text: item, isNew: false })),
    rundownTour: rundownTour.map((item) => ({ time: item.time, activity: item.activity, isNew: false })),
    facilityTour: facilityTour.map((item) => ({ text: item, isNew: false })),
    price1: "", // Tambahkan nilai default untuk harga
    price2: "",
    price3: "",
    price4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleListChange = (field, index, value) => {
    setFormData((prevData) => {
      const updatedList = [...prevData[field]];
      updatedList[index] = value;
      return { ...prevData, [field]: updatedList };
    });
  };

  const handleAddListItem = (field, defaultValue = {}) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], { ...defaultValue, isNew: true }],
    }));
  };

  const handleRemoveListItem = (field, index) => {
    setFormData((prevData) => {
      const updatedList = prevData[field].filter((_, i) => i !== index);
      return { ...prevData, [field]: updatedList };
    });
  };

  // Fungsi untuk menutup form
  const closeForm = () => {
    setIsFormOpen(false);
  };
  return (
          <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7 overflow-hidden">
            <Card className="w-full max-w-screen-sm">
      <img
                src={close}
                alt="Close"
                className="absolute -top-2 -right-4 w-12 h-12 cursor-pointer"
                onClick={closeForm}
              />
        <CardBody>
        <div className="mb-4 sm:mt-10 lg:mt-6">
                  <Typography variant="h4" className="text-customGreenslow  font-poppins" >
                    Hallo Admin  🙌
                  </Typography>
                  <Typography variant="h4" className="text-customGreenslow font-medium font-poppins text-sm" >
                    Silahkan update deskripsi detail peket tour, update dengan jelas dan sesuai yaa !
                  </Typography>
                  </div>

                  <div className="mb-6 flex flex-col items-center sm:mt-8 md:items-start">
                    <img
                    src={image}
                      alt="Profil"
                      className="w-48 h-48 rounded-lg object-cover mb-4"
                    />
                    <Button onClick={toggleModal} size="sm"
                      variant="outlined" // Tombol hanya border
                      className="border-gray-600 text-customGreenslow hover:bg-gray-100 font-poppins mt-2 md:ml-4 lg:ml-10">
                      Pilih foto
                    </Button>
                    <Typography variant="small" className="text-customGreenslow font-normal mt-2 font-poppins">
                      <p className='mt-2'> File size: maximum 10 Megabytes (MB).</p>
                      <p> Allowed file extensions: .JPG .JPEG .PNG</p>
                    </Typography>
                  </div>
          {/* Nama Tour */}
          <div className="mb-4">
            <Typography variant="h6" className="text-customGreenslow mb-1 font-poppins">
              Nama Tour
            </Typography>
            <Input
              size="lg"
              value={formData.title}
              onChange={handleChange}
              name="title"
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
              value={formData.about}
              onChange={handleChange}
              name="about"
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
            {formData.programTour.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  size="lg"
                  value={item.text}
                  onChange={(e) =>
                    handleListChange("programTour", index, { ...item, text: e.target.value })
                  }
                  className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                  placeholder="Masukkan program"
                  labelProps={{
                className: "before:content-none after:content-none",
              }}
                />
                {item.isNew && (
                  <Button
                    size="sm"
                    className=" text-white  normal-case font-poppins bg-customred"
                    onClick={() => handleRemoveListItem("programTour", index)}
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}
            <Button
              size="sm"
              className="bg-customGreen text-white font-poppins mb-5  normal-case"
              onClick={() => handleAddListItem("programTour", { text: "" })}
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
            {formData.rundownTour.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2"
              >
                <Input
                  size="lg"
                  value={item.time}
                  onChange={(e) =>
                    handleListChange("rundownTour", index, { ...item, time: e.target.value })
                  }
                  placeholder="Jam (e.g., 08:00)"
                  className="flex-1 !border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Input
                  size="lg"
                  value={item.activity}
                  onChange={(e) =>
                    handleListChange("rundownTour", index, { ...item, activity: e.target.value })
                  }
                  placeholder="Aktivitas"
                  className="flex-1 !border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {item.isNew && (
                  <Button
                    size="sm"
                    className="bg-customred text-white font-poppins normal-case"
                    onClick={() => handleRemoveListItem("rundownTour", index)}
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
                handleAddListItem("rundownTour", { time: "", activity: "" })
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
            {formData.facilityTour.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  size="lg"
                  value={item.text}
                  onChange={(e) =>
                    handleListChange("facilityTour", index, { ...item, text: e.target.value })
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
                    className=" text-white  normal-case font-poppins bg-customred"
                    onClick={() => handleRemoveListItem("facilityTour", index)}
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}
            <Button
              size="sm"
              className="bg-customGreen text-white font-poppins  normal-case"
              onClick={() => handleAddListItem("facilityTour", { text: "" })}
            >
              Tambah Facility
            </Button>
          </div>
          {/* Form Price */}

          {/* Form Price */}
          <div className="mb-4">
  <Typography
    variant="h6"
    className="text-customGreenslow mb-1 font-poppins"
  >
    Price Tour
  </Typography>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
    {[
      { label: "2 Person", name: "price1", value: formData.price1 },
      { label: "3-5 Person", name: "price2", value: formData.price2 },
      { label: "6-10 Person", name: "price3", value: formData.price3 },
      { label: "11 Person", name: "price4", value: formData.price4 },
    ].map((item, index) => (
      <div key={index} className="flex flex-col items-start">
        <Typography
          variant="small"
          className="text-gray-600 font-poppins mb-1"
        >
          {item.label}
        </Typography>
        <Input
          size="lg"
          value={item.value}
          onChange={(e) =>
            handleChange({
              target: { name: item.name, value: e.target.value },
            })
          }
          name={item.name}
          className="!border !border-gray-300 focus:!border-gray-500 focus:ring-0 focus:outline-none !rounded-md w-full max-w-[120px]"
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
            onClick={() => {
              console.log("Updated Data:", formData);
              window.location.href = updateLink;
            }}
          >
            Simpan Update !!
          </Button>
        </CardFooter>

      </Card>
    </div>
  );
};

export default FormUpdatePaketTour;
