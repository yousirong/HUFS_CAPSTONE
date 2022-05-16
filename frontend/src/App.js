import WebFont from 'webfontloader';
import Login from './components/User/Login';
import Register from './components/User/Register';
import User from './components/User_myshop/User_myshop';
import { Routes, Route, useLocation, Navigate, useRoutes } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { useEffect } from 'react';
//import { useDispatch } from 'react-redux';

import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import NotFound from './components/NotFound';
import detailshop from './components/Detailshop/Detailshop';

//layouts
import DashboardLayout from './components/Layouts/dashboard';
import LogoOnlyLayout from './components/Layouts/LogoOnlyLayout/LogoOnlyLayout';
function App() {
  //const dispatch = useDispatch();
  const { pathname } = useLocation();
  //   const [stripeApiKey, setStripeApiKey] = useState("");

  //   async function getStripeApiKey() {
  //     const { data } = await axios.get('/api/v1/stripeapikey');
  //     setStripeApiKey(data.stripeApiKey);
  //   }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:300,400,500,600,700'],
      },
    });
  });

  // useEffect(() => {
  //   dispatch(loadUser());
  //   // getStripeApiKey();
  // }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  // disable right click
  window.addEventListener('contextmenu', (e) => e.preventDefault());
  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });
  let Page = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'user', element: <User /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/home" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);
  return Page;
}

export default App;
