// component
import Iconify from '../../Home/Dashboard/Iconify';
import EqualizerIcon from '@mui/icons-material/Equalizer';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
// import ReviewsIcon from '@mui/icons-material/Reviews';
// import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import CloseIcon from '@mui/icons-material/Close';
// import Avatar from '@mui/material/Avatar';
// page 별로 출력될 title과 sidebar 글씨 옆에 출력될 아이콘 출력 함수
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/home',
    // icon: getIcon('eva:pie-chart-2-fill'),
    icon: <EqualizerIcon />,
  },
  {
    title: 'My Shop',
    path: '/dashboard/User',
    // icon: getIcon('eva:people-fill'),
    icon: <GroupIcon />,
  },
  {
    title: 'login',
    path: '/login',
    // icon: getIcon('eva:lock-fill'),
    icon: <LogoutIcon />,
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
