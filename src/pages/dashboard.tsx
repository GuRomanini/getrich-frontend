import Head from 'next/head';
import { useEffect, useContext } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from '../styles/dashboard.module.scss'
import { UserContext } from '@/contexts/UserContext';

const petr4: any = {
  ticker: 'PETR4',
  quantity: 100,
  averagePrice: 28.00,
  currentPrice: 37.00
}

const wege3: any = {
  ticker: 'WEGE3',
  quantity: 150,
  averagePrice: 31.25,
  currentPrice: 34.82
}

const data = [
  petr4,
  wege3
];

export default function Page() {
  const { 
    person_name,
    document_number,
    date_of_birth,
    username
  } = useContext(UserContext)
  
  useEffect(() => {
    data.map((item) => {
      item.upside = ((item.currentPrice / item.averagePrice) - 1) * 100;
      if(item.currentPrice < item.averagePrice) item.upside *= -1;

      item.upside = item.upside.toFixed(1).toString();
      item.upside = item.upside + ' %';
    })
  }, [])

  return(
    <>
      <Head>
        <title>Getrich | Dashboard</title>
      </Head>
      <>
        <h1>{`Bem-vindo, ${person_name}`}</h1>
        <div className={styles.container}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={styles.searchBar}>
            <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type='text'
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                  />
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Asset</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Average price</TableCell>
                  <TableCell align="center">Current price</TableCell>
                  <TableCell align="center">Upside/Downside</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.ticker}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ticker}
                    </TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.averagePrice}</TableCell>
                    <TableCell align="center">{row.currentPrice}</TableCell>
                    <TableCell align="center">{row.upside}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    </>
  );
}