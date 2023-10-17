import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { BsReverseListColumnsReverse } from 'react-icons/bs';
import { CiHospital1 } from 'react-icons/ci';
import { FiUsers } from 'react-icons/fi';
import { RiProfileLine } from 'react-icons/ri';
import Donor from './pages/Donor';
import PatientWaitlist from './pages/PatientWaitlist';
import Inventory from './pages/Inventory';
import Hospital from './pages/Hospital';
import Admin from './pages/Admin';
import HospitalProfile from './pages/HospitalProfile';
const routes = [
  {
    name: 'Patient Waitlist',
    key: 'patientwaitlist',
    icon: <BsReverseListColumnsReverse />,
    route: '/patientwaitlist',
    component: <PatientWaitlist />,
  },
  {
    name: 'Inventory',
    key: 'inventory',
    icon: <BloodtypeIcon className="text-2xl" />,
    route: '/inventory',
    component: <Inventory />,
  },
  {
    name: 'Hospital',
    key: 'hospital',
    icon: <CiHospital1 className="text-2xl" />,
    route: '/hospitals',
    component: <Hospital />,
  },
  {
    name: 'Donor',
    key: 'donor',
    icon: <FiUsers className="text-xl mr-1" />,
    route: '/donor',
    component: <Donor />,
  },
  {
    name: 'Admin',
    key: 'admin',
    icon: <AdminPanelSettingsIcon />,
    route: '/admin',
    component: <Admin />,
  },
  {
    name: 'Hospital Profile',
    key: 'hospitalProfile',
    icon: <RiProfileLine className="text-2xl" />,
    route: '/HospitalProfile',
    component: <HospitalProfile />,
  },
];
export default routes;
