// @mui
import { styled } from '@mui/material/styles'
import { Card, Link, Container, Typography } from '@mui/material'

import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loginUser } from '../../actions/userAction'
import { useSnackbar } from 'notistack'
import BackdropLoader from '../Layouts/BackdropLoader'
import MetaData from '../Layouts/MetaData'
// hooks
import useResponsive from '../../utils/useResponsive'
// components
// import Page from '../Home/Dashboard/Page'
// import Logo from '../components/Logo';
// login form auth
import LoginForm from '../User/auth/login/LoginForm'

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

const Login = () => {
  const smUp = useResponsive('up', 'sm')

  const mdUp = useResponsive('up', 'md')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const location = useLocation()

  const { loading, isAuthenticated, error } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }

  const redirect = location.search ? location.search.split('=')[1] : 'account'

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
      dispatch(clearErrors())
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`)
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar])

  return (
    <>
      <MetaData title="Login">
        <RootStyle>
          <HeaderStyle>{/* <Logo /> */}</HeaderStyle>
          {loading && <BackdropLoader />}
          <main className="w-full mt-12 sm:pt-0 sm:mt-0">
            {/* <!-- row --> */}
            <div className="flex sm:w-4/6 sm:mt-0 m-auto mb- bg-white shadow-lg">
              {/* <!-- sidebar column  --> */}
              <div className="loginSidebar bg-primary-blue p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5">
                <h1 className="font-medium text-white text-3xl">Login</h1>
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
                    <img
                      src="/static/illustrations/illustration_login.png"
                      alt="login"
                    />
                  </SectionStyle>
                )}
              </div>
              {/* <!-- sidebar column  --> */}

              {/* <!-- login column --> */}
              <div className="flex-1 overflow-hidden">
                {/* <!-- edit info container --> */}
                <div className="text-center py-10 px-4 sm:px-14">
                  {/* <!-- input container --> */}
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-col w-full gap-4">
                      <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {/* <span className="text-xxs text-red-500 font-medium text-left mt-0.5">Please enter valid Email ID/Mobile number</span> */}

                      {/* <!-- button container --> */}
                      <div className="flex flex-col gap-2.5 mt-2 mb-32">
                        <p className="text-xs text-primary-grey text-left">
                          By continuing, you agree to Flipkart's{' '}
                          <a
                            href="https://www.flipkart.com/pages/terms"
                            className="text-primary-blue"
                          >
                            {' '}
                            Terms of Use
                          </a>{' '}
                          and{' '}
                          <a
                            href="https://www.flipkart.com/pages/privacypolicy"
                            className="text-primary-blue"
                          >
                            {' '}
                            Privacy Policy.
                          </a>
                        </p>
                        <button
                          type="submit"
                          className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                        >
                          Login
                        </button>
                        <RouterLink
                          to="/password/forgot"
                          className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
                        >
                          Forgot Password?
                        </RouterLink>
                      </div>
                      {/* <!-- button container --> */}
                    </div>
                  </form>
                  {/* <!-- input container --> */}

                  <RouterLink
                    to="/register"
                    className="font-medium text-sm text-primary-blue"
                  >
                    New to Flipkart? Create an account
                  </RouterLink>
                </div>
                {/* <!-- edit info container --> */}
              </div>
              {/* <!-- login column --> */}
            </div>
            {/* <!-- row --> */}
          </main>
        </RootStyle>
      </MetaData>
    </>
  )
}

export default Login
