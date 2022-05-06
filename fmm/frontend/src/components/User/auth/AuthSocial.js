// material
import { Stack, Button, Divider, Typography } from '@mui/material'
// component
import Iconify from '../../Home/Dashboard/Iconify'
// login과 register에 구글, 페이스북, 트위터로 가입할 건지 버튼 출력함수 -> 사용 x
// 전에 프로젝트에서 가져옴.
// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:google-fill"
            color="#DF3E30"
            width={22}
            height={22}
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:facebook-fill"
            color="#1877F2"
            width={22}
            height={22}
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:twitter-fill"
            color="#1C9CEA"
            width={22}
            height={22}
          />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  )
}
