import notFound from '../assets/images/404-not-found.svg';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import MetaData from './Layouts/MetaData';

// 404pages 출력 함수
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
const NotFound = () => {
  return (
    <MetaData title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            죄송합니다. 페이지를 찾을 수 없습니다!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            찾을 수 없는 페이지 입니다. 요청하신 페이지가 사라졌거나. 잘못된 URL를 이용하셨습니다.
          </Typography>

          <Box component="img" src={notFound} sx={{ height: 440, mx: 'auto', my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </MetaData>
  );
};

export default NotFound;
