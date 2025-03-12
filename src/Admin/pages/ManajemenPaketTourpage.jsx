import ManajemenPackageTour from '../components/ManajemenPaketTourComponents'
import NavbarComponent from '../components/NavbarAdminComponent';
import FooterComponents from '../../components/FooterComponents';

const ManajemenPaketTour = () => { // Ganti nama fungsi lokal
  return (
    <div>
      <NavbarComponent />
      <ManajemenPackageTour />
      <FooterComponents />
    </div>
  );
};

export default ManajemenPaketTour;
