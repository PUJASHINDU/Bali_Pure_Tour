import React from 'react';

import FormUpdatePaketTour from '../components/FormUpdatePaketTour'; // Pastikan path ini sesuai dengan struktur folder Anda
import NavbarComponent from '../components/NavbarAdminComponent'
import FooterComponents from '../../components/FooterComponents';


const FormUpdatePaketTourpage = () => {
  // Contoh data awal untuk form
  return (
    <div>
    <NavbarComponent/>
    <FormUpdatePaketTour/>
    <FooterComponents />
    </div>
  );
};

export default FormUpdatePaketTourpage;
