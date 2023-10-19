import React, { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

import styles from '../styles/signin.module.scss'
import Link from 'next/link';
import Image from 'next/image';

import { SigninData } from '../types/user'

import { api, signin } from '../services/api'

require('../services/api');

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`O username digitado foi: ${username}`);
    console.log(`A senha digitada foi: ${password}`);

    const signinData: SigninData = {
      username,
      password
    }

    console.log(signinData)
    signin(signinData)
  }

  return(
    <div className={styles.container}>
      <Image width={230} height={140} src="/images/logo.png" alt="Getrich logo"/>

      <form onSubmit={handleSubmit}>
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

        <Button variant="contained" type="submit" className={styles.button}>Login</Button>
      </form>
    
      <Link href="/signup">Não possui cadastro? Cadastre-se!</Link>
    </div>
  );
}