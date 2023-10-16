import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Donor from './pages/Donor';
import PatientWaitlist from './pages/PatientWaitlist';
import Hospital from './pages/Hospital';
import Homepage from './pages/Homepage';
import Inventory from './pages/Inventory';
import CreateDonor from './components/Forms/CreateDonor';
import EditDonor from './components/Forms/EditDonor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HospitalProfile from './pages/HospitalProfile';
import Admin from './pages/Admin';

const App = () => (
  <Router>
    <Navbar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patientwaitlist" element={<PatientWaitlist />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/hospitals" element={<Hospital />} />
        <Route path="/hospital" element={<HospitalProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create-donor" element={<CreateDonor />} />
        <Route path="/donor/edit/:donorId" element={<EditDonor />} />
        <Route path="/HospitalProfile/:hospitalId" element={<EditDonor />} />
      </Routes>
    </Navbar>
    <ToastContainer />
  </Router>
);

export default App;
