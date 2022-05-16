import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
// components
import MenuPopover from '../../Home/Dashboard/MenuPopover';
// 번역
import i18next from 'i18next';

// en.json, ko.json 만들어 놔야됨.
// 오른쪽 상단에 User account 출력 옆에 나타날 영한변환 함수 -> 크롬이용시 페이지 페이지 번역하는 아이콘 기능 ->
// 클릭만 되고 번역하는 기능 연동을 아직 개발 못함. 클릭만 됨.
// ----------------------------------------------------------------------
function changeLang(lang) {
  i18next.changeLanguage(lang);
}

const LANGS = [
  {
    value: 'kr',
    label: 'South Korea',
    icon: '/static/icons/Flag_of_South_Korea.svg',
  },
  {
    value: 'en',
    label: 'United States',
    icon: '/static/icons/Flag_of_the_United_States.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const options = [
    { label: '한국어', value: 'ko' },
    { label: 'English', value: 'en' },
  ];

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              options={options}
              placeholder="Language"
              labelKey="label"
              valueKey="value"
              key={option.value}
              selected={option.value === LANGS[0].value}
              onChange={({ option }) => {
                changeLang(option.value);
              }}
              onClick={() => handleClose()}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
