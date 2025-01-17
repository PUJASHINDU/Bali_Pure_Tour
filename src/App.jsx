import React from 'react'
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Booking from './pages/Booking';
import DetailBaliPureTour from './pages/DetailBaliPureTour';
import DetailBaliCook from './pages/DetailBaliCook';
import DetailBaliTreek from './pages/DetailBaliTreek';
import DetailBaliTrekBikes from './pages/DetailBaliTrekBikes';
import Loginpage from './pages/LoginPage';
import SinginPage from './pages/SinginPage';
import ProfilePage from './pages/ProfilePage';
import Acountpage from './pages/Acountpage';
import BookingInformationPage from './pages/BookingInformationPage';
import Servicepage from './pages/Servicepage';
import FromBookingpage from './pages/FromBookingpage';
import AllPackgeTourPage from './pages/AllPackgeTourPage';

// Admin
import AdminDashboardpage from '../src/Admin/pages/AdminDashboardpage';
import FormUpdateCardPaketpage from './Admin/pages/FormUpdateCardPaketpage';
import FormUpdatePaketTourpage from './Admin/pages/FormUpdatePaketTourpage';
import FormDetailPesananpage from './Admin/pages/FormDetailPesananpage';
const App = () => {
  return (
    <div>
    <Routes>
    <Route path="/" element={<HomePage />} /> {/* Route utama "/" untuk halaman Index */}
    <Route path="/Homepage" element={<HomePage/>} />
    <Route path="/DetailBaliPureTour" element={<DetailBaliPureTour/>} />
    <Route path="/DetailBaliCook" element={<DetailBaliCook/>} />
    <Route path="/DetailBaliTreek" element={<DetailBaliTreek/>} />
    <Route path="/DetailBaliTrekBikes" element={<DetailBaliTrekBikes/>} />
    <Route path="/LoginPage" element={<Loginpage/>} />
    <Route path="/SinginPage" element={<SinginPage/>} />
    <Route path="/ProfilePage" element={<ProfilePage/>} />
    <Route path="/Acountpage" element={<Acountpage/>} />
    <Route path="/BookingInformationPage" element={<BookingInformationPage/>} />
    <Route path="/AdminDashboardpage" element={<AdminDashboardpage/>} />
    <Route path="/FormUpdateCardPaketpage" element={<FormUpdateCardPaketpage/>} />
    <Route path="/FormUpdatePaketTourpage" element={<FormUpdatePaketTourpage/>} />
    <Route path="/FormDetailPesananpage" element={<FormDetailPesananpage/>} />
    <Route path="/AllPackgeTourPage" element={<AllPackgeTourPage/>} />
    <Route path="/FromBookingpage" element={<FromBookingpage/>} />
    <Route path="/Servicepage" element={<Servicepage/>} />
    <Route path="/Booking" element={<Booking />} />
    </Routes>
    </div>
  )
}

export default App
