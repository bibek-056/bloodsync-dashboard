import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Donor from './pages/donor';
import PatientWaitlist from './pages/PatientWaitlist';
import Hospital from './pages/Hospital';
import Homepage from './pages/Homepage';
import Inventory from './pages/Inventory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateDonor from './components/Forms/CreateDonor';

const App = () => (
  <>
    <Router>
      <Navbar>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/patientwaitlist" element={<PatientWaitlist />} />
          <Route path="/donor" element={<Donor />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/hospitals" element={<Hospital />} />
          <Route path="/create-donor" element={<CreateDonor />} />
        </Routes>
      </Navbar>
    </Router>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </>
);

export default App;
