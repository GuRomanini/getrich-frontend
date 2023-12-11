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

import styles from '../styles/signin.module.scss'
import Link from 'next/link';
import Image from 'next/image';

import { SigninData } from '../types/user'

import { signin } from '../api/api'
import { redirect } from 'next/navigation';

export default function Page() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [signinFailed, setSigninFailed] = useState<boolean | undefined>(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const signinData: SigninData = {
      username,
      user_password: password
    }

    const res = await signin(signinData, true) // verbose = true

    if(res) {
      setSigninFailed(false)
      router.push('/dashboard')
    } else {
      resetForm()
      setSigninFailed(true)
    }
  }

  const resetForm = () => {
    setUsername("")
    setPassword("")
    setSigninFailed(true)
  }

  return(
    <>
      <Head>
        <title>Getrich | Sign In</title>
      </Head>
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
      
        {signinFailed && (
          <div className={styles.signinFailed}>
            <p>O Login falhou. Por favor, confira seu username e sua senha e tente novamente!</p>
          </div>
        )}
      </div>
    </>
  );
}