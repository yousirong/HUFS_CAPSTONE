import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// logo 넣을 경우 반응들 -> 과거에 프로젝트 했던거 넣어둠
// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width: 50, height: 50, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 94 94">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            d="M71.375,12.104h-48.3c-4.846,0-6.195,1.66-6.195,6.955v29.227c10.291,5.392,19.128,4.435,23.956,4.284
			c2.024-0.103,3.328,0.347,4.119,1.179c0.139,0.117,0.283,0.242,0.435,0.383c0.907,0.843,1.793,1.576,2.66,2.192
			c0.177-2.389,1.515-3.936,5.114-3.756c4.9,0.154,13.934,1.143,24.425-4.528V19.059C77.589,14.077,75.968,12.104,71.375,12.104z
			 M36.614,48.993c-5.177,0-9.378-3.926-9.378-8.773c0-4.846,4.201-8.772,9.378-8.772c5.18,0,9.38,3.927,9.38,8.772
			C45.994,45.067,41.794,48.993,36.614,48.993z M58.439,48.993c-5.178,0-9.379-3.926-9.379-8.773c0-4.846,4.201-8.772,9.379-8.772
			c5.18,0,9.381,3.927,9.381,8.772C67.82,45.067,63.619,48.993,58.439,48.993z"
          />
          <path
            d="M89,0H5C2.238,0,0,2.239,0,5v84c0,2.761,2.238,5,5,5h84c2.762,0,5-2.239,5-5V5C94,2.239,91.762,0,89,0z M84.643,47.84
			c-2.772,3.4-8.051,7.622-16.14,10.942c8.578,29.153-20.888,33.784-20.438,18.837c0,0.27-0.015-8.012-0.026-14.184
			c-0.63-0.154-1.301-0.332-2.074-0.515c-0.012,6.214-0.027,14.976-0.027,14.698c0.451,14.947-28.997,10.316-20.439-18.837
			C17.41,55.462,12.133,51.24,9.359,47.84c-1.426-2.11,0.099-4.319,2.423-2.696c0.314,0.224,0.626,0.437,0.938,0.648V15.64
			c0-4.183,3.145-7.562,7.016-7.562h54.571c3.869,0,7.016,3.379,7.016,7.562v30.124c0.3-0.203,0.6-0.406,0.898-0.62
			C84.545,43.521,86.068,45.73,84.643,47.84z"
          />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
