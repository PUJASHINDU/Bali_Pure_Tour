import React from "react";
import close from '../../assets/icon/close.png';
import fieldIcon from '../../assets/icon/Gagal_icon.png';

const FieldModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative font-poppins z-50">
        <img
          src={close}
          alt="Close"
          className="absolute -top-3 -right-4 w-12 h-12 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={fieldIcon} alt="Success" className="w-16 h-16" />
          </div>
        </div>
        <div className="">
        <h2 className="text-lg font-medium text-gray-700 mb-4 font-poppins">
          Ops Sorry Lagi Ada Masalah!!
        </h2>
        <p className="text-sm font-medium  text-customGreenslow mb-4 font-poppins">Coba Lagi Nanti Yaa </p>
        </div>
      </div>
    </div>
  );
};

export default FieldModal;
