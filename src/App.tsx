import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Donor from './pages/donor';
import PatientWaitlist from './pages/PatientWaitlist';
import Hospital from './pages/Hospital';
import Homepage from './pages/Homepage';
import Inventory from './pages/Inventory';

const App = () => (
  <Router>
    <Navbar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/patientwaitlist" element={<PatientWaitlist />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/hospitals" element={<Hospital />} />
      </Routes>
    </Navbar>
  </Router>
);

export default App;
