import PropTypes from 'prop-types';
import { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../utils/useResponsive';
// components
// import Logo from '../../components/Logo';
import Scrollbar from '../../Home/Dashboard/Scrollbar';
import NavSection from '../../Layouts/dashboard/NavSection';
//
import navConfig from './NavConfig';
import { logoutUser } from '../../../actions/userAction';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 240;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));
// dashboard함수에 sidebar 출력 함수
// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  //const { user } = useSelector((state) => state.user);

  //   const handleLogout = () => {
  //     dispatch(logoutUser());
  //     enqueueSnackbar('Logout Successfully', { variant: 'success' });
  //     navigate('/login');
  //   };
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>{/* <Logo /> */}</Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 30 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Button href="https://www.google.co.kr/" target="_blank" variant="contained">
            로그아웃
            {/* Log Out */}
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
