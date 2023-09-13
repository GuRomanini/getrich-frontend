import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import styles from './styles/signup.module.scss'
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = React.useState<dateFns | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`O nome digitado foi: ${name}`);
    console.log(`A data de nascimento fornecida foi: ${birthDate}`);
    console.log(`O username digitado foi: ${username}`);
    console.log(`A senha digitada foi: ${password}`);
  }

  return(
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={styles.textInput}>
            <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              label="Username"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
            />
          </ FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={birthDate} onChange={(newValue) => {setBirthDate(newValue); console.log(newValue);}}/>
            </DemoContainer>
          </LocalizationProvider>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={styles.textInput}>
            <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              label="Username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)}}
            />
          </ FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={styles.textInput}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}
            />
          </FormControl>

          <Button variant="contained" type="submit" className={styles.button}>Cadastrar</Button>
        </form>
      </div>
    );
}