import { Link as RouterLink } from 'react-router-dom'
// @mui
import { styled } from '@mui/material/styles'
import { Card, Link, Container, Typography } from '@mui/material'
// hooks
import useResponsive from '../../utils/useResponsive'
// components
import Page from '../Home/Dashboard/Page'
// import Logo from '../components/Logo';
// sections
import RegisterForm from '../User/auth/register/RegisterForm'
// import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

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
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))
// register page 출력함수
// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive('up', 'sm')

  const mdUp = useResponsive('up', 'md')

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>{/* <Logo /> */}</HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography lang="ko" variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              우리와 함께 더 효과적으로 작업을 관리하십시오.
              {/* Manage the job more effectively with us */}
            </Typography>
            <img
              alt="register"
              src="/static/illustrations/illustration_register.png"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography lang="ko" variant="h4" gutterBottom>
              무료 계정을 시작하세요.{/* Get started free account. */}
            </Typography>

            <Typography lang="ko" sx={{ color: 'text.secondary', mb: 5 }}>
              영원히 무료입니다. 신용 카드가 필요하지 않습니다.
              {/* Free forever. No credit card needed. */}
            </Typography>

            {/* <AuthSocial /> */}

            <RegisterForm />
            {smUp && (
              <Typography lang="ko" variant="body2" sx={{ mt: { md: 5 } }}>
                이미 계정이 있습니까? {/* Already have an account?  */}
                {''}
                <Link
                  lang="ko"
                  variant="subtitle2"
                  component={RouterLink}
                  to="/login"
                >
                  로그인{/* Login */}
                </Link>
              </Typography>
            )}
            <Typography
              lang="ko"
              variant="body2"
              align="center"
              sx={{ color: 'text.secondary', mt: 3 }}
            >
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
              <Typography
                lang="ko"
                variant="body2"
                sx={{ mt: 3, textAlign: 'center' }}
              >
                이미 계정이 있습니까?{/* Already have an account? */}{' '}
                <Link
                  lang="ko"
                  variant="subtitle2"
                  to="/login"
                  component={RouterLink}
                >
                  로그인{/* Login */}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}
