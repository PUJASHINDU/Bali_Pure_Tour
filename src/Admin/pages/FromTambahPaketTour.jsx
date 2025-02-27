import FromTambahPaketTour from '../components/FromTambahPaketTour';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponents from '../../components/FooterComponents';

const TambahPaketTourPage = () => { // Ganti nama fungsi lokal
  return (
    <div>
      <NavbarComponent />
      <FromTambahPaketTour />
      <FooterComponents />
    </div>
  );
};

export default TambahPaketTourPage;
