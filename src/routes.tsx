import PersonIcon from '@mui/icons-material/Person';
import ViewListIcon from '@mui/icons-material/ViewList';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Donor from './pages/Donor';
import PatientWaitlist from './pages/PatientWaitlist';
import Inventory from './pages/Inventory';
import Hospital from './pages/Hospital';
const routes = [
  {
    name: 'Donors',
    key: 'donors',
    icon: <PersonIcon />,
    route: '/donor',
    component: <Donor />,
  },
  {
    name: 'Patient Waitlist',
    key: 'patientwaitlist',
    icon: <ViewListIcon />,
    route: '/patientwaitlist',
    component: <PatientWaitlist />,
  },
  {
    name: 'Inventory',
    key: 'inventory',
    icon: <BloodtypeIcon />,
    route: '/inventory',
    component: <Inventory />,
  },
  {
    name: 'Hospitals',
    key: 'hospital',
    icon: <LocalHospitalIcon />,
    route: '/hospital',
    component: <Hospital />,
  },
];
export default routes;
