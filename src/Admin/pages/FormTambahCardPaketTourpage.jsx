import AddCardPaketTour from '../components/FormTambahCardPaketTour';
import NavbarComponent from '../components/NavbarAdminComponent';
import FooterComponents from '../../components/FooterComponents';

const TambahCardPaketTourPage = () => { // Ganti nama fungsi lokal
  return (
    <div>
      <NavbarComponent />
      <AddCardPaketTour />
      <FooterComponents />
    </div>
  );
};

export default TambahCardPaketTourPage;