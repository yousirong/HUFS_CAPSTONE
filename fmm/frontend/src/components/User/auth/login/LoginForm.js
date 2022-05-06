// //import * as Yup from 'yup';
// import TextField from '@mui/material/TextField';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { useSnackbar } from 'notistack';
// // import { useFormik, Form, FormikProvider } from 'formik';
// // material
// // import { Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
// // import { LoadingButton } from '@mui/lab';
// // component
// // import Iconify from '../../../components/Iconify';
// // actions
// import { clearErrors, loginUser } from '../../../actions/userAction';
// // layouts  -> MetaData title보여주는 페이지인데 안쓰이면 제거 해도 될듯
// import BackdropLoader from '../../../layouts/BackdropLoader';
// import MetaData from '../../../layouts/MetaData';
// // login 관련 form 출력함수
// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const location = useLocation();

//   const { loading, isAuthenticated, error } = useSelector((state) => state.user);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(email, password));
//   };

//   const redirect = location.search ? location.search.split('=')[1] : 'account';

//   useEffect(() => {
//     if (error) {
//       enqueueSnackbar(error, { variant: 'error' });
//       dispatch(clearErrors());
//     }
//     if (isAuthenticated) {
//       navigate(`/${redirect}`);
//     }
//   }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

//   return (
//     <>
//       <MetaData title="Login | HUFS_CAPSTONE" />

//       {loading && <BackdropLoader />}
//       <main className="w-full mt-12 sm:pt-20 sm:mt-0">
//         {/* <!-- row --> */}
//         <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
//           {/* <!-- sidebar column  --> */}
//           <div className="loginSidebar bg-primary-blue p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5">
//             <h1 className="font-medium text-white text-3xl">로그인</h1>
//             <p className="text-gray-200 text-lg">For Small business. For Salesperson. For Everyone.</p>
//           </div>
//           {/* <!-- sidebar column  --> */}

//           {/* <!-- login column --> */}
//           <div className="flex-1 overflow-hidden">
//             {/* <!-- edit info container --> */}
//             <div className="text-center py-10 px-4 sm:px-14">
//               {/* <!-- input container --> */}
//               <form onSubmit={handleLogin}>
//                 <div className="flex flex-col w-full gap-4">
//                   <TextField
//                     fullWidth
//                     id="email"
//                     label="Email address"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <TextField
//                     fullWidth
//                     id="password"
//                     label="Password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   {/* <span className="text-xxs text-red-500 font-medium text-left mt-0.5">Please enter valid Email ID/Mobile number</span> */}

//                   {/* <!-- button container --> */}
//                   <div className="flex flex-col gap-2.5 mt-2 mb-32">
//                     <p className="text-xs text-primary-grey text-left">
//                       계정 등록함으로써 HUFS_CAPSTONE{' '}
//                       <a href="https://www.flipkart.com/pages/terms" className="text-primary-blue">
//                         {' '}
//                         서비스 약관
//                       </a>{' '}
//                       및{' '}
//                       <a href="https://www.flipkart.com/pages/privacypolicy" className="text-primary-blue">
//                         {' '}
//                         개인 정보 보호 정책
//                       </a>
//                       에 동의합니다.
//                     </p>
//                     <button
//                       type="submit"
//                       className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
//                     >
//                       로그인
//                     </button>
//                     <Link
//                       to="/password/forgot"
//                       className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
//                     >
//                       비밀번호를 잊으셨나요?
//                     </Link>
//                   </div>
//                   {/* <!-- button container --> */}
//                 </div>
//               </form>
//               {/* <!-- input container --> */}

//               <Link to="/register" className="font-medium text-sm text-primary-blue">
//                 처음이신가요? 계정 만들기
//               </Link>
//             </div>
//             {/* <!-- edit info container --> */}
//           </div>
//           {/* <!-- login column --> */}
//         </div>
//         {/* <!-- row --> */}
//       </main>
//     </>
//   );
// }

//_________________________________________________________________________________________________________________
// import * as Yup from 'yup';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { useSnackbar } from 'notistack';
// import { useFormik, Form, FormikProvider } from 'formik';
// // material
// import { Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // component
// import Iconify from '../../../components/Iconify';
// // actions
// import { clearErrors, loginUser } from '../../../actions/userAction';
// // layouts  -> MetaData title보여주는 페이지인데 안쓰이면 제거 해도 될듯
// // import BackdropLoader from '../Layouts/BackdropLoader';
// // import MetaData from '../Layouts/MetaData';
// // login 관련 form 출력함수
// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const location = useLocation();

//   //   const { loading, isAuthenticated, error } = useSelector((state) => state.user);
//   const { isAuthenticated, error } = useSelector((state) => state.user);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(email, password));
//   };

//   const redirect = location.search ? location.search.split('=')[1] : 'account';

//   useEffect(() => {
//     if (error) {
//       enqueueSnackbar(error, { variant: 'error' });
//       dispatch(clearErrors());
//     }
//     if (isAuthenticated) {
//       navigate(`/${redirect}`);
//     }
//   }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

//   const [showPassword, setShowPassword] = useState(false);

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().email('이메일은 유효한 이메일 형식이어야 합니다.').required('이메일은 필수 항목입니다.'),
//     password: Yup.string().required('비밀번호가 필요합니다'),
//     // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
//     // password: Yup.string().required('Password is required'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       remember: true,
//     },
//     validationSchema: LoginSchema,
//     onSubmit: () => {
//       navigate('/dashboard', { replace: true });
//     },
//   });

//   const { errors, touched, values, isSubmitting, getFieldProps } = formik;
//   //   const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

//   const handleShowPassword = () => {
//     setShowPassword((show) => !show);
//   };

//   return (
//     <FormikProvider value={formik}>
//       <Form autoComplete="off" noValidate onSubmit={handleLogin}>
//         <Stack spacing={3}>
//           <TextField
//             lang="ko"
//             fullWidth
//             id="email"
//             autoComplete="username"
//             type="email"
//             label="이메일"
//             // label="Email address"
//             value={email}
//             {...getFieldProps('email')}
//             error={Boolean(touched.email && errors.email)}
//             helperText={touched.email && errors.email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <TextField
//             lang="ko"
//             fullWidth
//             id="password"
//             autoComplete="current-password"
//             type={showPassword ? 'text' : 'password'}
//             label="비밀번호"
//             // label="Password"
//             {...getFieldProps('password')}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleShowPassword} edge="end">
//                     <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             error={Boolean(touched.password && errors.password)}
//             helperText={touched.password && errors.password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </Stack>

//         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
//           <FormControlLabel
//             lang="ko"
//             control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
//             label="이메일 기억하기"
//             // label="Remember me"
//           />

//           {/* <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
//             Forgot password?
//           </Link> */}
//         </Stack>

//         <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
//           로그인
//           {/* Login */}
//         </LoadingButton>
//       </Form>
//     </FormikProvider>
//   );
// }
//__________________________________________________________________________________
import * as Yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik, Form, FormikProvider } from 'formik'
// material
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// component
import Iconify from '../../../Home/Dashboard/Iconify'
// login 관련 form 출력함수
// ----------------------------------------------------------------------
export default function LoginForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('이메일은 유효한 이메일 형식이어야 합니다.')
      .required('이메일은 필수 항목입니다.'),
    password: Yup.string().required('비밀번호가 필요합니다'),
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true })
    },
  })
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik
  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            lang="ko"
            fullWidth
            autoComplete="username"
            type="email"
            label="이메일"
            // label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            lang="ko"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            // label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            lang="ko"
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label="이메일 기억하기"
            // label="Remember me"
          />

          {/* <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          로그인
          {/* Login */}
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}
