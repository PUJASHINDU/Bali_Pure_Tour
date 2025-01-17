import React from 'react';
import {
  Typography,
  Button,
} from '@material-tailwind/react';
import CardPackageTour from '../components/CardPackgeTourAdmin';
const ManajemenPaketTourComponents = () => {
  return (
    <div className="px-4 py-10 container mx-auto">
      <div className="md:ml-4">
        <Typography
          variant="small"
          className="text-customGreenslow font-medium font-poppins"
        >
          <h3 className=" text-xl mb-1">
            Hallo Selamat Datang Admin 🙌
          </h3>
          <p>
            Manajemen Paket Tour ini digunakan untuk mengelola paket tour mulai
          </p>
          <p>dari menambah, mengedit dan menghapus !!</p>
        </Typography>
      </div>

      <div className="mt-6 mb-3 md:ml-4">
        <a href="" className="inline-block">
          <Button
            size="md"
            variant="text"
            className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
          >
            Tambah Paket Tour
          </Button>
        </a>
      </div>
      <CardPackageTour />
    </div>
  )
}

export default ManajemenPaketTourComponents
