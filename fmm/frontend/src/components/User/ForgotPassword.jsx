import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../../utils/useResponsive';
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

const ForgotPassword = () => {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
    setEmail('');
  };
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('이메일은 유효한 이메일 형식이어야 합니다.').required('이메일은 필수 항목입니다.'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    // register 확인될 경우 dashboard로 navigate
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });
  const { errors, touched, isSubmitting, getFieldProps } = formik;
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (message) {
      enqueueSnackbar(message, { variant: 'success' });
    }
  }, [dispatch, error, message, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Forgot Password" />
      <RootStyle>
        {loading && <BackdropLoader />}
        <Container maxWidth="lg">
          <FormSidebar title="Forgot Your Password?" tag="Enter the email address associated with your account." />
          <ContentStyle>
            <Typography lang="ko" variant="h4" gutterBottom>
              forget passwoard{/* Sign In */}
            </Typography>

            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                {/* <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="이메일"
                  // label="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                {/* </Stack> */}

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  로그인
                  {/* Login */}
                </LoadingButton>
                {/* </Stack> */}
              </Form>
            </FormikProvider>
            {/* <!-- button container --> */}
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
            {/* <RouterLink to="/register" className="font-medium text-sm text-primary-blue">
              New to Flipkart? Create an account
            </RouterLink> */}
            {smUp && (
              <Typography lang="ko" variant="body2" sx={{ mt: { md: 5 } }}>
                이미 계정이 있습니까? {/* Already have an account?  */}
                {''}
                <Link lang="ko" variant="subtitle2" component={RouterLink} to="/login">
                  계정찾기{/* Login */}
                </Link>
              </Typography>
            )}
            {!smUp && (
              <Typography lang="ko" variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                이미 계정이 있습니까?{/* Already have an account? */}{' '}
                <Link lang="ko" variant="subtitle2" to="/login" component={RouterLink}>
                  계정찾기{/* Login */}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
};

export default ForgotPassword;
