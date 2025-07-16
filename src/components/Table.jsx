import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'symbol', label: 'Symbol', minWidth: 100, align: 'center' },
  { id: 'current_price', label: 'Price (USD)', minWidth: 120, align: 'right', format: (value) => `$${value.toFixed(2)}` },
  { id: 'market_cap', label: 'Market Cap', minWidth: 150, align: 'right', format: (value) => `$${value.toLocaleString()}` },
  { id: 'price_change_percentage_24h', label: '24h Change (%)', minWidth: 150, align: 'right', format: (value) => `${value.toFixed(2)}%` },
];

export default function CryptoTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const API_BASE = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${API_BASE}/api/coins`)
      .then((res) => setRows(res.data))
      .catch((err) => console.error("Error fetching crypto data", err));
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{
      width: '100%',
      overflow: 'hidden',
      mt: 4,
      backgroundColor: 'transparent',
      boxShadow: 'none',
    }}>
      <TableContainer sx={{ backgroundColor: 'transparent' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell  key={column.id} align={column.align || 'left'} style={{ minWidth: column.minWidth , backgroundColor: 'transparent',
                  color: 'white' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((coin, index) => (
              <TableRow hover key={index}>
                {columns.map((column) => {
                const value = coin[column.id];
                let textColor = 'white'; 
                if (column.id === 'price_change_percentage_24h') {
                  if (value < 0) textColor = 'red';
                  else if (value > 0) textColor = 'limegreen';
                }

                return (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    style={{
                      backgroundColor: 'transparent',
                      color: textColor,
                    }}
                  >
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}
