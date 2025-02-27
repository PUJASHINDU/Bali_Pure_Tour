import React from "react";
import { Button } from "@material-tailwind/react";
import close from '../../assets/icon/close.png';

const UpdateOptionsModal = ({ isOpen, onClose, onSelect }) => {
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
          <div className="w-16 h-16 flex items-center justify-center border-4 border-green-600 rounded-full">
            <span className="text-3xl text-green-600 font-poppins">?</span>
          </div>
        </div>
        <h2 className="text-sm font-medium text-gray-700 mb-4 font-poppins">
          Hallo Admin, Mau Update Data Bagian Yang Mana nih?
        </h2>
        <div className="flex justify-center gap-4">
          <Button className="bg-customGreen text-white px-4 py-2 rounded-md font-poppins" onClick={() => onSelect("detail")}>
            Detail Tour
          </Button>
          <Button className="bg-customGreen text-white px-4 py-2 rounded-md font-poppins" onClick={() => onSelect("card")}>
            Card Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOptionsModal;
