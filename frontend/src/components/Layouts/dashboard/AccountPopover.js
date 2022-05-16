import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// @mui
import { alpha } from '@mui/material/styles'
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material'
// components
import MenuPopover from '../../Home/Dashboard/MenuPopover'
// mocks_
import account from '../../../_mock/account'
// dashboard에서 오른쪽 상단에 표시될 User의 account 클릭 반응 및 출력 관련 함수
// ----------------------------------------------------------------------
// 아래의 내용 개발 안할 경우 지우기
const MENU_OPTIONS = [
  {
    // label: 'Home',
    label: '메인홈',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    // label: 'Profile',
    label: '내 계정',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    // label: 'Settings',
    label: '환경설정',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)

  const [open, setOpen] = useState(null)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          로그아웃{/* Logout */}
        </MenuItem>
      </MenuPopover>
    </>
  )
}
