import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';

import Register from './components/User/Register';

import User from './components/User_myshop/User_myshop';
import { Routes, Route, useLocation, Navigate, useRoutes } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import AdminDashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/OrderTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import ProductTable from './components/Admin/ProductTable';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import UserTable from './components/Admin/UserTable';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewsTable from './components/Admin/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';

//layouts
import DashboardLayout from './components/Layouts/dashboard';
import LogoOnlyLayout from './components/Layouts/LogoOnlyLayout/LogoOnlyLayout';
function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  //   api axios 구현 추가함/--------------------------------------------
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

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);

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
        { path: 'products', element: <Products /> },
        {
          path: 'admin',
          children: [
            {
              path: 'admindashboard',
              element: (
                <ProtectedRoute isAdmin={true}>
                  <AdminDashboard activeTab={0}>
                    <MainData />
                  </AdminDashboard>
                </ProtectedRoute>
              ),
            },
          ],
        },
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
        {
          path: 'password',
          children: [
            { path: 'forgot', element: <ForgotPassword /> },
            { path: 'reset', children: [{ path: ':token', element: <ResetPassword /> }] },
            {
              path: 'update',
              children: [
                {
                  path: 'update',
                  element: (
                    <ProtectedRoute>
                      <UpdatePassword />
                    </ProtectedRoute>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return Page;
}

export default App;
