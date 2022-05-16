import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
// component
import Iconify from '../Iconify'
// User_myshop에서 진행상황을 변경하는 edit 하나씩 매장 delete하는 추가 메뉴 부분
// ----------------------------------------------------------------------

export default function UserMoreMenu() {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  )
}
