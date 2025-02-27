import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import close from '../../assets/icon/close.png';
import successIcon from '../../assets/icon/custom-icon.png';

const BerhasilTambahModal = ({ onClose }) => {
  const navigate = useNavigate(); // ✅ Inisialisasi navigate

  const handleOkeyClick = () => {
    navigate("/ManajemenPackageTour"); // ✅ Navigasi ke halaman tujuan
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative font-poppins z-50">
        <img
          src={close}
          alt="Close"
          className="absolute -top-3 -right-4 w-12 h-12 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center border-4 border-green-600 rounded-full">
            <img src={successIcon} alt="Success" className="w-12 h-12" />
          </div>
        </div>
        <h2 className="text-sm font-medium text-gray-700 mb-4 font-poppins">
          Yeayy Tambah Package Tour Berhasil 🙌
        </h2>
        <div className="flex justify-center gap-4">
          <Button
            size="md"
            className="bg-customGreen text-white normal-case w-28"
            onClick={handleOkeyClick} // ✅ Navigasi saat klik
          >
            Okey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BerhasilTambahModal;
