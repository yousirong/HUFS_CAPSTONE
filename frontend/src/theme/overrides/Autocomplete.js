// ----------------------------------------------------------------------
// override 될경우 뒤에 페이지 그림자 되는 기능
export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  };
}
