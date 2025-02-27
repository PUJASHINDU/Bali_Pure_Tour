import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import CardPackageTour from '../components/CardPackgeTourAdmin';

const ManajemenPaketTourComponents = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 container mx-auto">
      <div className="md:ml-4">
        <Typography
          variant="small"
          className="text-customGreenslow font-medium font-poppins"
        >
          <h3 className="text-xl mb-1">Hallo Selamat Datang Admin 🙌</h3>
          <p>Manajemen Paket Tour ini digunakan untuk mengelola paket tour mulai</p>
          <p>dari menambah, mengedit dan menghapus !!</p>
        </Typography>
      </div>

      <div className="mt-6 mb-3 md:ml-4">
        <Button
          size="md"
          variant="text"
          className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
          onClick={() => navigate('/FromTambahPaketTour')}
        >
          Tambah Paket Tour
        </Button>
      </div>

      <CardPackageTour />
    </div>
  );
};

export default ManajemenPaketTourComponents;
