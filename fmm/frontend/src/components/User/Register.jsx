import * as Yup from 'yup';
import * as React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import useResponsive from '../../utils/useResponsive';

import { LoadingButton } from '@mui/lab';

// component
import Iconify from '../Home/Dashboard/Iconify';
// register page 관련 form 출력함수
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
const Register = () => {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // default는 ******* 처럼 안보임 -> 클릭시 본인이 적은 비밀번호 확인가능
  const [showPassword, setShowPassword] = useState(false);
  // 빨간색 글씨로 오류 처리하는 부분
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(1, '너무 짧습니다.').max(50, '너무 깁니다.').required('이름은 필수 항목입니다.'),
    lastName: Yup.string().min(1, '너무 짧습니다.').max(50, '너무 깁니다.').required('성은 필수 항목입니다.'),
    email: Yup.string().email('이메일은 유효한 이메일 형식이어야 합니다.').required('이메일은 필수 항목입니다.'),
    password: Yup.string().required('비밀번호는 필수 항목입니다.'),
    phonenumber: Yup.string().required('핸드폰 번호는 필수 항목입니다.'),
  });
  // register 변수
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      //   re_enter_password: '',
      phonenumber: '',
    },
    validationSchema: RegisterSchema,
    // register 확인될 경우 dashboard로 navigate
    onSubmit: () => {
      navigate('/dashboard/home', { replace: true });
    },
  });
  // error handler 및 유저 선택적 api 변수
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phonenumber: '',
  });

  const { firstName, lastName, email, password, phonenumber } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('preview.png');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 1) {
      enqueueSnackbar('Password length must be at least 1 characters', { variant: 'warning' });
      return;
    }
    if (!avatar) {
      enqueueSnackbar('Select Avatar', { variant: 'error' });
      return;
    }

    const formData = new FormData();

    formData.set('firstName', firstName);
    formData.set('lastName', lastName);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('phonenumber', phonenumber);
    formData.set('avatar', avatar);

    dispatch(registerUser(formData));
  };

  const handleDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Register" />
      <RootStyle>
        <HeaderStyle>{/* <Logo /> */}</HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography lang="ko" variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              우리와 함께 더 효과적으로 작업을 관리하십시오.
              {/* Manage the job more effectively with us */}
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography lang="ko" variant="h4" gutterBottom>
              오신 것을 환영합니다.{/* Get started free account. */}
            </Typography>

            <Typography lang="ko" sx={{ color: 'text.secondary', mb: 5 }}>
              지금 회원 가입하신 후 다양한 서비스를 만나보세요.
              {/* Free forever. No credit card needed. */}
            </Typography>

            {/* <AuthSocial /> */}

            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleRegister}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      lang="ko"
                      fullWidth
                      label="이름"
                      //   label="First name"
                      {...getFieldProps('firstName')}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />

                    <TextField
                      lang="ko"
                      fullWidth
                      label="성"
                      //   label="Last name"
                      {...getFieldProps('lastName')}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Stack>

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
                          <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <TextField
                    lang="ko"
                    fullWidth
                    label="핸드폰 번호"
                    // label="Phone number"
                    {...getFieldProps('phonenumber')}
                    error={Boolean(touched.phonenumber && errors.phonenumber)}
                    helperText={touched.phonenumber && errors.phonenumber}
                  />
                  {/* <!-- input container column --> */}

                  <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                    <Avatar alt="Avatar Preview" src={avatarPreview} sx={{ width: 56, height: 56 }} />
                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleDataChange}
                        className="hidden"
                      />
                      Choose File
                    </label>
                  </div>
                  <LoadingButton
                    lang="ko"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    계정 생성
                    {/* Create Account */}
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
            {smUp && (
              <Typography lang="ko" variant="body2" sx={{ mt: { md: 5 } }}>
                이미 계정이 있습니까? {/* Already have an account?  */}
                {''}
                <Link lang="ko" variant="subtitle2" component={RouterLink} to="/login">
                  로그인{/* Login */}
                </Link>
              </Typography>
            )}
            <Typography lang="ko" variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              계정 등록함으로써 HUFS_CAPSTONE
              <Link lang="ko" underline="always" color="text.primary" href="#">
                {''} 서비스 약관 {/* Terms of Service */}
              </Link>
              {''}및 {/* and */}
              {''}
              <Link lang="ko" underline="always" color="text.primary" href="#">
                개인 정보 보호 정책{''}
                {/* Privacy Policy */}
              </Link>
              에 동의합니다.&nbsp;
              {/* By registering, I agree to HUFS_CAPSTONE */}
            </Typography>

            {!smUp && (
              <Typography lang="ko" variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                이미 계정이 있습니까?{/* Already have an account? */}{' '}
                <Link lang="ko" variant="subtitle2" to="/login" component={RouterLink}>
                  로그인{/* Login */}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
      {/* <MetaData title="Register" />
  {
   loading && <BackdropLoader />;
 }
<main className="w-full mt-12 sm:pt-20 sm:mt-0"> */}
      {/* <!-- row --> */}
      {/* <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg"> */}
      {/* <FormSidebar title="Looks like you're new here!" tag="Sign up with your mobile number to get started" /> */}

      {/* <!-- signup column --> */}
      {/* <div className="flex-1 overflow-hidden"> */}
      {/* <!-- personal info procedure container --> */}
      {/* <form onSubmit={handleRegister} encType="multipart/form-data" className="p-5 sm:p-10"> */}
      {/* <div className="flex flex-col gap-4 items-start"> */}
      {/* <!-- input container column --> */}
      {/* <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
             <TextField
               fullWidth
               id="full-name"
               label="Full Name"
               name="name"
               value={name}
               onChange={handleDataChange}
               required
             />
             <TextField
               fullWidth
               id="email"
               label="Email"
               type="email"
               name="email"
               value={email}
               onChange={handleDataChange}
               required
             />
           </div> */}
      {/* <!-- input container column --> */}

      {/* <!-- gender input --> */}
      {/* <div className="flex gap-4 items-center">
             <h2 className="text-md">Your Gender :</h2>
             <div className="flex items-center gap-6" id="radioInput">
               <RadioGroup row aria-labelledby="radio-buttons-group-label" name="radio-buttons-group">
                 <FormControlLabel
                   name="gender"
                   value="male"
                   onChange={handleDataChange}
                   control={<Radio required />}
                   label="Male"
                 />
                 <FormControlLabel
                   name="gender"
                   value="female"
                   onChange={handleDataChange}
                   control={<Radio required />}
                   label="Female"
                 />
               </RadioGroup>
             </div>
           </div> */}
      {/* <!-- gender input --> */}

      {/* <!-- input container column --> */}
      {/* <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
             <TextField
               id="password"
               label="Password"
               type="password"
               name="password"
               value={password}
               onChange={handleDataChange}
               required
             />
             <TextField
               id="confirm-password"
               label="Confirm Password"
               type="password"
               name="cpassword"
               value={cpassword}
               onChange={handleDataChange}
               required
             />
           </div> */}
      {/* <!-- input container column --> */}
      {/*
           <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
             <Avatar alt="Avatar Preview" src={avatarPreview} sx={{ width: 56, height: 56 }} />
             <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
               <input type="file" name="avatar" accept="image/*" onChange={handleDataChange} className="hidden" />
               Choose File
             </label>
           </div>
           <button
             type="submit"
             className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
           >
             Signup
           </button>
           <Link
             to="/login"
             className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
           >
             Existing User? Log in
           </Link>
         </div>
       </form> */}
      {/* <!-- personal info procedure container --> */}
      {/* </div> */}
      {/* <!-- signup column --> */}
      {/* </div> */}
      {/* <!-- row --> */}
      {/* </main>; */}
    </>
  );
};

export default Register;
