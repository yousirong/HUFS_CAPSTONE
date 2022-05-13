import * as Yup from 'yup';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';

import { Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
// hooks
import useResponsive from '../../utils/useResponsive';
// components
// import Page from '../Home/Dashboard/Page'
// import Logo from '../components/Logo';
// login form auth

import Iconify from '../Home/Dashboard/Iconify';
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const redirect = location.search ? location.search.split('=')[1] : 'account';

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('이메일은 유효한 이메일 형식이어야 합니다.').required('이메일은 필수 항목입니다.'),
    password: Yup.string().required('비밀번호가 필요합니다'),
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <>
      <MetaData title="Login">
        <RootStyle>
          <HeaderStyle>{/* <Logo /> */}</HeaderStyle>
          {loading && <BackdropLoader />}
          {/* <main className="w-full mt-12 sm:pt-0 sm:mt-0"> */}
          {/* <!-- row --> */}
          {/* <div className="flex sm:w-4/6 sm:mt-0 m-auto mb- bg-white shadow-lg"> */}
          {/* <!-- sidebar column  --> */}
          {/* <div className="loginSidebar bg-primary-blue p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5"> */}
          {/* <h1 className="font-medium text-white text-3xl">Login</h1> */}
          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5 }}>
                For Small business.
              </Typography>
              <Typography variant="h3" sx={{ px: 5 }}>
                For Salesperson.
              </Typography>
              <Typography variant="h3" sx={{ px: 5 }}>
                For Everyone.
              </Typography>
              <img src="/static/illustrations/illustration_login.png" alt="login" />
            </SectionStyle>
          )}
          <Container maxWidth="sm">
            <ContentStyle>
              <Typography lang="ko" variant="h4" gutterBottom>
                로그인{/* Sign In */}
              </Typography>

              <Typography lang="ko" sx={{ color: 'text.secondary', mb: 5 }}>
                아래에 세부 정보를 입력하세요.{/* Enter your details below. */}
              </Typography>

              {/* <AuthSocial /> */}

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
                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <FormControlLabel
                      lang="ko"
                      control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                      label="이메일 기억하기"
                      // label="Remember me"
                    />

                    {/* <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link> */}
                  </Stack>

                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    로그인
                    {/* Login */}
                  </LoadingButton>
                  {/* forget Password  */}
                  <LoadingButton>
                    <RouterLink to="/password/forgot">Forgot Password?</RouterLink>
                  </LoadingButton>
                </Form>
              </FormikProvider>
              {smUp && (
                <Typography lang="ko" variant="body2" sx={{ mt: { md: 5 } }}>
                  계정이 없으신가요?{/* Don’t have an account?  */}
                  {''}
                  <Link variant="subtitle2" component={RouterLink} to="/register">
                    회원가입{/* Get started */}
                  </Link>
                </Typography>
              )}
              {!smUp && (
                <Typography lang="ko" variant="body2" align="center" sx={{ mt: 3 }}>
                  계정이 없으신가요?
                  {/* Don’t have an account? */}{' '}
                  <Link lang="ko" variant="subtitle2" component={RouterLink} to="/register">
                    회원가입{/* Get started */}
                  </Link>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </MetaData>
    </>
  );
};

export default Login;
