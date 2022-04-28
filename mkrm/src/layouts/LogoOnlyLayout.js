import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
// import Logo from '../components/Logo';
// logo누를 경우 dashboard 초기화 및 dashboard로 이동하는 logo icon 출력 함수  -> 과거 프로젝트에서 가져옴. -> 사용안함.
// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>{/* <Logo /> */}</HeaderStyle>
      <Outlet />
    </>
  );
}
