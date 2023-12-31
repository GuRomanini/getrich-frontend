import Head from 'next/head';
import React, { useState } from "react";
import { useRouter } from 'next/router';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import DatePicker from "react-datepicker";

import styles from '../styles/signup.module.scss'
import { NewUser } from '../types/user'
import { signup } from '../api/api'

// import datetime;

export default function Page() {
  const router = useRouter();
  
  const [name, setName] = useState<string>("");
  const [docNumber, setDocNumber] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null | string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignupSuccess, setSignupSuccess] = useState<boolean | undefined>(false);
  const [, updateState] = useState<any>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: NewUser = {
      person_name: name,
      document_number: docNumber,
      date_of_birth: birthDate,
      username: username,
      user_password: password
    }

    const res = await signup(newUser, true) // verbose = true

    if(res) {
      setTimeout(() => {}, 3000)
      router.push('/signin')
    } else {
      resetForm()
    }
  }

  const resetForm = () => {
    setName("")
    setDocNumber("")
    setBirthDate("")
    setUsername("")
    setPassword("")
    setSignupSuccess(false)
  }

  return(
    <>
      <Head>
        <title>Getrich | Sign Up</title>
      </Head>
      <ArrowBackIcon fontSize="large" className={styles.backButton} onClick={() => router.back()}/>
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

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={styles.textInput}>
            <InputLabel htmlFor="outlined-adornment-password">CPF (apenas números)</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              label="Username"
              value={docNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if(event.target.value.length <= 11) setDocNumber(event.target.value);
              }}
            />
          </ FormControl>

          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={birthDate} onChange={(newValue) => {setBirthDate(newValue)}}/>
            </DemoContainer>
          </LocalizationProvider> */}

          {/* <DatePicker onChange={(new_value) => setBirthDate(new_value)}></DatePicker> */}

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={styles.textInput}>
            <InputLabel htmlFor="outlined-adornment-password">Data de Nascimento</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              label="Username"
              value={birthDate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBirthDate(event.target.value);
              }}
            />
          </ FormControl>

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

        {isSignupSuccess && (
          <div className={styles.successfullLogin}>
            <p>Registration completed successfully!</p>
          </div>
        )}
      </div>
    </>
  );
}