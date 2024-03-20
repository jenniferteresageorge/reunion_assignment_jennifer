import React, { useState, useEffect } from 'react';
import sampleData from './sampledata.json';
import DateFnsUtils from '@date-io/date-fns'; // Import DateFnsUtils
import { useTable, useSortBy, useFilters, useGroupBy, useGlobalFilter, useExpanded, usePagination } from 'react-table';
import { TextField, Button, Slider, Grid } from '@material-ui/core'; // Import Grid for layout
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import './styles.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [showSidePanel, setShowSidePanel] = useState(false);

  useEffect(() => {
    setData(sampleData);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Subcategory',
        accessor: 'subcategory',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Sale Price',
        accessor: 'sale_price',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageCount, globalFilter }, // Destructure state properly
    setGlobalFilter,
    gotoPage,
    canPreviousPage,
    previousPage,
    nextPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageCount: 10 }, // Set initial pagination state
    },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ textAlign: 'center' }}>
        <h2>Data Table</h2>
        <Grid container justify="flex-end" style={{ marginBottom: '10px' }}>
          <Button onClick={() => setShowSidePanel(!showSidePanel)}>
            {showSidePanel ? 'Hide Side Panel' : 'Show Side Panel'}
          </Button>
        </Grid>
        <Grid container justify="center">
          <TextField
            label="Search"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            style={{ marginBottom: '10px' }}
          />

          <table {...getTableProps()} style={{ margin: 'auto', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()} style={{ padding: '8px', textAlign: 'left' }}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {}
          
          
      <div style={{ marginTop: '10px', textAlign: 'center' }}> {}
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
        <div>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </div>
      </div>
      </Grid>
      </div>
      {showSidePanel && <SidePanel />}
    </MuiPickersUtilsProvider>
  );
};

const SidePanel = () => {
  const [priceRange, setPriceRange] = useState([0, 200]); // Initial price range
  const [salePriceRange, setSalePriceRange] = useState([0, 200]); // Initial sale price range

  const handleFilterChange = (filterName, value) => {
    // Implement filter change logic here
  };

  return (
    <div className="side-panel"> {/* Apply the side-panel class */}
      <h3>Filters</h3>
      <div style={{ marginBottom: '20px' }}>
        <h3>Price Range</h3>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => {
            setPriceRange(newValue);
            handleFilterChange('price', newValue);
          }}
          style={{ width: '80%', margin: '0 auto' }}
        />
      </div>
      <div style={{ marginBottom: '50px' }}>
        <h3>Sale Price Range</h3>
        <Slider
          value={salePriceRange}
          onChange={(e, newValue) => {
            setSalePriceRange(newValue);
            handleFilterChange('saleprice', newValue);
          }}
          style={{ width: '80%', margin: '0 auto' }}
        />
      </div>
      <div>
        <h3>Filter by Date Range</h3>
        <DateRangeFilter onChange={(newValue) => handleFilterChange('createdAt', newValue)} />
      </div>
    </div>
  );
};

const DateRangeFilter = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
    onChange(dates);
  };

  return (
    <div>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={handleDateChange}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DataTable;