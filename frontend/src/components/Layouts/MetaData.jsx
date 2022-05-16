import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { forwardRef } from 'react'
// @mui
import { Box } from '@mui/material'
// page별로 title 변환 함수 -> <Helmet>태그를 쓰는데 app.js router기능에서 뺄까 생각중
// route기능이 중첩되어 page가 출력 안되는것 같음.
const MetaData = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | HUFS_CAPSTONE`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
))

MetaData.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
}

export default MetaData
