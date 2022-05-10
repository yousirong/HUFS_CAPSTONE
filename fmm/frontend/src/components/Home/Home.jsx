//------------------20220506 dashboard 중첩과정---------------------------------
import { faker } from '@faker-js/faker';
import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { filter } from 'lodash';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
// material
import {
  Grid,
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
//import Page from './Dashboard/Page'
import Iconify from './Dashboard/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from './Dashboard/@Dashboard/app';
// Recent market search

// components

//import Label from './Dashboard/Label'
import Scrollbar from './Dashboard/Scrollbar';
//import { sentenceCase } from 'change-case'
// import Iconify from '../components/Iconify';
import SearchNotFound from './Dashboard/SearchNotFound';
// eslint-disable-next-line import/named
import { UserListHead, DashUserListToolbar, UserMoreMenu } from './Dashboard/user';
// mock
import USERLIST from '../../_mock/user';
// ----------------------------------------------------------------------
//---------------------------------------------------------------------------
import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
//---------------------------20220506 dashboard 중첩--------------------------------
const columns = [
  {
    field: 'company',
    headerName: '매장이름',
    alignRight: false,
  },
  {
    field: 'name',
    headerName: '대표자이름',
    alignRight: false,
  },
  {
    field: 'repnum',
    headerName: '대표번호',
    alignRight: false,
  },
  {
    field: 'sector',
    headerName: '업종',
    alignRight: false,
  },
  {
    field: 'rating',
    headerName: '평점',
    alignRight: false,
  },
  {
    field: 'review',
    headerName: '리뷰',
    alignRight: false,
  },
  {
    field: 'isnew',
    headerName: '신규',
    alignRight: false,
  },
  {
    field: 'location',
    headerName: '위치',
    alignRight: false,
  },
];
const initialRows = [
  {
    id: 1,
    first: 'Jane',
    last: 'Carter',
  },
  {
    id: 2,
    first: 'Jack',
    last: 'Smith',
  },
  {
    id: 3,
    first: 'Gill',
    last: 'Martin',
  },
];
const TABLE_HEAD = [
  { id: 'company', label: '매장이름', alignRight: false },
  { id: 'name', label: '대표자이름', alignRight: false },
  { id: 'repnum', label: '대표번호', alignRight: false },
  { id: 'sector', label: '업종', alignRight: false },
  { id: 'rating', label: '평점', alignRight: false },
  { id: 'review', label: '리뷰', alignRight: false },
  { id: 'isnew', label: '신규', alignRight: false },
  { id: 'location', label: '위치', alignRight: false },
  //   { id: 'status', label: '진행상황', alignRight: false },
  { id: '' },
];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
//--------------------------------------------------------------------------------------

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 600,
  width: '100%',
  '& .MuiFormGroup-options': {
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    '& > div': {
      minWidth: 100,
      margin: theme.spacing(2),
      marginLeft: 0,
    },
  },
}));
function SettingsPanel(props) {
  const { onApply, type, size, theme } = props;
  const [sizeState, setSize] = React.useState(size);
  const [typeState, setType] = React.useState(type);
  const [selectedPaginationValue, setSelectedPaginationValue] = React.useState(-1);
  const [activeTheme, setActiveTheme] = React.useState(theme);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event) => {
    setType(event.target.value);
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleThemeChange = React.useCallback((event) => {
    setActiveTheme(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
      theme: activeTheme,
    });
  }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

  return (
    <FormGroup className="MuiFormGroup-options" row>
      <FormControl variant="standard">
        <InputLabel>Dataset</InputLabel>
        <Select value={typeState} onChange={handleDatasetChange}>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Commodity">Commodity</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Rows</InputLabel>
        <Select value={sizeState} onChange={handleSizeChange}>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
          <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
          <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Page Size</InputLabel>
        <Select value={selectedPaginationValue} onChange={handlePaginationChange}>
          <MenuItem value={-1}>off</MenuItem>
          <MenuItem value={0}>auto</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Theme</InputLabel>
        <Select value={activeTheme} onChange={handleThemeChange}>
          <MenuItem value="default">Default Theme</MenuItem>
          <MenuItem value="ant">Ant Design</MenuItem>
        </Select>
      </FormControl>
      <Button size="small" variant="outlined" color="primary" onClick={handleApplyChanges}>
        <KeyboardArrowRightIcon fontSize="small" /> Apply
      </Button>
    </FormGroup>
  );
}

SettingsPanel.propTypes = {
  onApply: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['ant', 'default']).isRequired,
  type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
};
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);
  //--------------------------20220506 dashboard 중첩--------------------------------
  const theme = useTheme();
  const [page, setPage] = useState(0);
  // 정렬
  const [order, setOrder] = useState('asc');
  // 최근 검색 매장에서 유저가 선택하기전 미리 선택해놓은 데이터는 없음(디폴트)
  const [selected, setSelected] = useState([]);
  // 최근 검색 매장에서 출력된 후 첫 번째는 매장 이름순으로 정렬
  const [orderBy, setOrderBy] = useState('name');
  // 최근 검색 매장에서 매장이름으로 검색 상태
  const [filterName, setFilterName] = useState('');
  // 최근 검색 매장 출력되는 행은 5개
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // 모든 click시 선택되는 핸들러 처리
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // Click관련 핸들러 처리
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  // 유저가 페이지 변환시 상태 핸들러
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // 유저가 페이지를 행변환 할시 핸들러
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  // 유저가 최근 검색 매장에서 매장이름으로 검색시 filter target
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  // 최근 검색 매장에서 매장이름이 비어있는 경우 핸들러
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  // 최근 검색 매장에서 매장이름으로 검색 시 Userlist -> filter -> order -> filtername
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  // 매장이름으로 검색했는데 찾지 못했을 경우 반환 값
  const isUserNotFound = filteredUsers.length === 0;
  //-----------------------------------------------------------------------------------
  const [rows, setRows] = React.useState(initialRows);
  const [selectedRow, setSelectedRow] = React.useState();

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute('data-id')));
    setContextMenu(contextMenu === null ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 } : null);
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const [isAntDesign, setIsAntDesign] = React.useState(false);
  const [type, setType] = React.useState('Commodity');
  const [size, setSize] = React.useState(100);
  const { data, setRowLength, loadNewData } = useDemoData({
    dataSet: type,
    rowLength: size,
    maxColumns: 6,
    editable: true,
  });

  const [pagination, setPagination] = React.useState({
    pagination: false,
    autoPageSize: false,
    pageSize: undefined,
  });

  const getActiveTheme = () => {
    return isAntDesign ? 'ant' : 'default';
  };

  const handleApplyClick = (settings) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
      setType(settings.type);
    }

    if (getActiveTheme() !== settings.theme) {
      setIsAntDesign(!isAntDesign);
    }

    if (size !== settings.size || type !== settings.type) {
      setRowLength(settings.size);
      loadNewData();
    }

    const newPaginationSettings = {
      pagination: settings.pagesize !== -1,
      autoPageSize: settings.pagesize === 0,
      pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
    };

    setPagination((currentPaginationSettings) => {
      if (
        currentPaginationSettings.pagination === newPaginationSettings.pagination &&
        currentPaginationSettings.autoPageSize === newPaginationSettings.autoPageSize &&
        currentPaginationSettings.pageSize === newPaginationSettings.pageSize
      ) {
        return currentPaginationSettings;
      }
      return newPaginationSettings;
    });
  };

  return (
    <>
      <MetaData title="Dashboard" />
      {/* -----------------20220506 dashboard 중첩------------------------------- */}
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>
          안녕하세요, 환영합니다.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="총 매장 수" total={4867911} icon="mdi:store" />
            {/* <AppWidgetSummary title="Total Market Num" total={4867911} icon="mdi:store" /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="총 검색된 시장 수" total={456484} color="info" icon="mdi:store-search" />
            {/* <AppWidgetSummary title="Total Search Market Num" total={456484} color="info" icon="mdi:store-search" /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="저장한 시장 수" total={897895} color="warning" icon="mdi:store-check" />
            {/* <AppWidgetSummary title="Stored Markets" total={897895} color="warning" icon="mdi:store-check" /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="신규 매장 등록 수" total={315} color="error" icon="mdi:store-plus" />
            {/* <AppWidgetSummary title="New Store Registration" total={315} color="error" icon="mdi:store-plus" /> */}
          </Grid>
          <Container>
            {/* <StyledBox> */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="h4" sx={{ mb: 2 }} gutterBottom>
                최근 시장 검색
              </Typography>
            </Stack>
            <StyledBox>
              <SettingsPanel onApply={handleApplyClick} size={size} type={type} theme={getActiveTheme()} />

              <Card>
                <DataGrid
                  columns={columns}
                  rows={rows}
                  components={{
                    LoadingOverlay: LinearProgress,
                    Toolbar: CustomToolbar,
                  }}
                  loading={loading}
                  checkboxSelection
                  disableSelectionOnClick
                  rowThreshold={0}
                  initialState={{
                    ...data.initialState,
                    pinnedColumns: { left: ['__check__', 'desk'] },
                  }}
                  {...pagination}
                />
                <DashUserListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
                {/* <Scrollbar> */}
                <TableContainer sx={{ minWidth: 500 }}>
                  <Table>
                    <UserListHead
                      lang="ko"
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const {
                          company,
                          id,
                          name,
                          repnum,
                          sector,
                          rating,
                          review,
                          isnew,
                          //   status,
                          location,
                          avatarUrl,
                        } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{company}</TableCell>
                            <TableCell align="left">{repnum}</TableCell>
                            <TableCell align="left">{sector}</TableCell>
                            <TableCell align="left">{rating}</TableCell>
                            <TableCell align="left">{review}</TableCell>
                            <TableCell align="left">
                              {isnew ? <Icon icon="bi:check" width="25" height="25" /> : ''}
                            </TableCell>
                            <TableCell align="left">{location}</TableCell>
                            <TableCell align="left">
                              {/* <Label
                                  variant="ghost"
                                  color={
                                    (status === 'failure' && 'error') ||
                                    'success'
                                  }
                                >
                                  {sentenceCase(status)}
                                </Label> */}
                            </TableCell>
                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                {/* </Scrollbar> */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={USERLIST.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </StyledBox>
          </Container>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+16%) than last year"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Dashboard만들기' },
                { id: '2', label: 'login&register만들기' },
                { id: '3', label: 'navbar&sidebar만들기' },
                { id: '4', label: 'My Shop만들기' },
                { id: '5', label: '상세페이지 만들기' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
      {/* -----------------20220506 dashboard 중첩------------------------------- */}

      <Container>
        <Categories />
        {/* <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2"> */}
        <Banner />
        <DealSlider title={'Discounts for You'} />
        {!loading && <ProductSlider title={'Suggested for You'} tagline={'Based on Your Activity'} />}
        <DealSlider title={'Top Brands, Best Price'} />
        {!loading && <ProductSlider title={'You May Also Like...'} tagline={'Based on Your Interest'} />}
        <DealSlider title={'Top Offers On'} />
        {!loading && <ProductSlider title={"Don't Miss These!"} tagline={'Inspired by your order'} />}
      </Container>
    </>
  );
};

export default Home;
