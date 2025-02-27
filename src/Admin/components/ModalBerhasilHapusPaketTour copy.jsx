import React from "react";
import { Button } from "@material-tailwind/react";
import close from '../../assets/icon/close.png';
import successIcon from '../../assets/icon/custom-icon.png';

const BerhasilTambahModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

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
            <img src={successIcon} alt="Success" className="w-12 h-12" />
        </div>
        <h2 className="text-sm font-medium text-gray-700 mb-4 font-poppins">
          Yeayy Dalate Packge Tour Successful 🙌
        </h2>
      </div>
    </div>
  );
};

export default BerhasilTambahModal;
