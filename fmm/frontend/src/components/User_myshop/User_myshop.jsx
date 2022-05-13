import * as React from 'react';
import { filter } from 'lodash';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import {
  Card,
  Tooltip,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Toolbar,
  IconButton,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  OutlinedInput,
} from '@mui/material';
import { useDemoData, randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import PropTypes, { string } from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';

// components

import Iconify from '../Home/Dashboard/Iconify';
import SearchNotFound from '../Home/Dashboard/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../Home/Dashboard/user';
// mock
import USERLIST from '../../_mock/user';
import MetaData from '../Layouts/MetaData';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import { sample } from 'lodash';
// user_myshop page 출력함수
// my shop 페이지에서 +new shop 버튼은 일단 만들어놓음 -> 추후에 개발 시간 남으면 개발 ㄱ
// ----------------------------------------------------------------------
// 순서대로 myshop 열 데이터
// 매장이름-> 대표자이름 -> 대표번호 -> 업종 -> 평점 -> 리뷰  ->신규 -> 진행상황

const initialRows = [
  {
    id: 1,
    company: '광화문진뚝해',
    name: '해장국',
    repnum: '02-730-0172',
    sector: '해장국',
    rating: '4.7',
    review: '3',
    isnew: true,
    stauts: '미정',
    location: '내수동 광화문시대 지하1층 B102호',
  },
  {
    id: 2,
    company: 'Jack',
    name: 'Smith',
  },
  {
    id: 3,
    company: 'Gill',
    name: 'Martin',
  },
  {
    id: 4,
    company: 'Gill',
    name: 'Martin',
  },
  {
    id: 5,
    company: 'Gill',
    name: 'Martin',
  },
  {
    id: 6,
    company: 'Gill',
    name: 'Martin',
  },
  {
    id: 7,
    company: 'Gill',
    name: 'Martin',
  },
  {
    id: 8,
    company: 'Gill',
    name: 'Martin',
  },
  {
    id: 9,
    company: 'Gill',
    name: 'Martin',
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
  { id: 'status', label: '진행상황', alignRight: false },
  { id: 'location', label: '위치', alignRight: false },

  { id: '' },
];

// ----------------------------------------------------------------------

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

//---------------------------------------------------------------------------------
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
  const { onApply, type, size } = props;
  const [sizeState, setSize] = React.useState(size);
  const [typeState, setType] = React.useState(type);
  const [selectedPaginationValue, setSelectedPaginationValue] = React.useState(-1);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event) => {
    setType(event.target.value);
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
    });
  }, [sizeState, typeState, selectedPaginationValue, onApply]);

  return (
    <FormGroup className="MuiFormGroup-options" row>
      <FormControl variant="standard">
        <InputLabel>Dataset</InputLabel>
        <Select value={typeState} onChange={handleDatasetChange}>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Commodity">Market</MenuItem>
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
      <Button size="small" variant="outlined" color="primary" onClick={handleApplyChanges}>
        <KeyboardArrowRightIcon fontSize="small" /> Apply
      </Button>
    </FormGroup>
  );
}
SettingsPanel.propTypes = {
  onApply: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
};

const User = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);
  const [rows, setRows] = React.useState(initialRows);
  // 원하는 매장 삭제
  const deleteCompany = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );
  // 진행상황 변경
  const editStatus = React.useCallback(
    (id) => () => {
      setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, status: '미정' } : row)));
    },
    [],
  );
  const columns = React.useMemo(
    () => [
      {
        field: 'company',
        headerName: '매장이름',
        type: 'string',
        width: 150,
        alignRight: false,
      },
      {
        field: 'name',
        headerName: '대표자이름',
        type: 'string',
        width: 80,
        alignRight: false,
      },
      {
        field: 'repnum',
        headerName: '대표번호',
        type: 'string',
        width: 110,
        alignRight: false,
      },
      {
        field: 'sector',
        headerName: '업종',
        type: 'string',
        width: 130,
        alignRight: false,
      },
      {
        field: 'rating',
        headerName: '평점',
        type: 'number',
        width: 70,
        alignRight: false,
      },
      {
        field: 'review',
        headerName: '리뷰',
        type: 'number',
        width: 80,
        alignRight: false,
      },
      {
        field: 'isnew',
        headerName: '신규',
        type: 'boolean',
        width: 100,
        alignRight: false,
      },
      {
        field: 'status',
        headerName: '진행상황',
        type: 'singleSelect',
        value: string,
        label: string,
        editable: true,
        valueOptions: ({ row }) => {
          if (row === undefined) {
            return ['미정', '진행중', '완료', '실패'];
          }
          const options = [];
          if (!['미정'].includes(row.status)) {
            options.push('미정', '진행중', '완료', '실패');
          } else {
            options.push('미정');
          }
          return options;
        },
        width: 90,
        alignRight: false,
      },
      {
        field: 'location',
        headerName: '위치',
        type: 'string',
        width: 280,
        alignRight: false,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={deleteCompany(params.id)} />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Edit 진행상황"
            onClick={editStatus(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteCompany, editStatus],
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [type, setType] = React.useState('Commodity');
  const [size, setSize] = React.useState(100);
  const { data, setRowLength, loadNewData } = useDemoData({
    dataSet: type,
    rowLength: size,
    maxColumns: 8,
    editable: true,
  });

  const [pagination, setPagination] = React.useState({
    pagination: false,
    autoPageSize: false,
    pageSize: undefined,
  });

  const handleApplyClick = (settings) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
      setType(settings.type);
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
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport utf8WithBom={true} />
      </GridToolbarContainer>
    );
  }
  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg width="120" height="100" viewBox="0 0 184 152" aria-hidden focusable="false">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }
  return (
    <>
      <MetaData title="My Shop">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={7}>
            <Typography lang="ko" variant="h4" gutterBottom>
              영업 관리 매장{/* My Shop */}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                lang="ko"
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                새로운 매장{/* New Shop */}
              </Button>
              {/* <Button variant="contained">삭제</Button> */}
              <Button lang="ko" variant="contained">
                진행상황 저장
              </Button>
            </Stack>
          </Stack>

          <StyledBox>
            <SettingsPanel onApply={handleApplyClick} size={size} type={type} />
            <Card>
              <DataGrid
                columns={columns}
                rows={rows}
                components={{
                  LoadingOverlay: LinearProgress,
                  Toolbar: CustomToolbar,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                loading={loading}
                checkboxSelection
                disableSelectionOnClick
                rowThreshold={0}
                initialState={{
                  ...data.initialState,
                  pinnedColumns: { left: ['__check__', 'company'] },
                }}
                {...pagination}
              />
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />
              {/* <Scrollbar> */}
              <TableContainer sx={{ minWidth: 800 }}>
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
                          <TableCell align="left"></TableCell>
                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={10} />
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
      </MetaData>
    </>
  );
};
export default User;
