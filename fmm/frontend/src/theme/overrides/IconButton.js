// 모든 icon에 해당되는 button은 hover시 색 변환 되는 함수
// ----------------------------------------------------------------------

export default function IconButton(theme) {
  return {
    MuiIconButton: {
      variants: [
        {
          props: { color: 'default' },
          style: {
            '&:hover': { backgroundColor: theme.palette.action.hover },
          },
        },
        {
          props: { color: 'inherit' },
          style: {
            '&:hover': { backgroundColor: theme.palette.action.hover },
          },
        },
      ],

      styleOverrides: {
        root: {},
      },
    },
  };
}
