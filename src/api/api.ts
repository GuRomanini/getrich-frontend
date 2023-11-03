import axios, { AxiosError, AxiosResponse } from 'axios';

import { redirect } from 'next/navigation'

import { SigninData, User } from '../types/user'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
  // baseURL: '/api'
})

/* --------------------------------- Session -------------------------------- */
export const signin = async (data: SigninData) => {
  try {
    await api.post('/user', data).then((res: AxiosResponse) => {
      if(res.status == 400) {
        redirect('/dashboard');
      }
    });  
  } catch(e: AxiosError | any) {
    console.log('Ops, deu ruim!');
    e.console.error();
  }
}

/* ---------------------------------- User ---------------------------------- */
export const signup = async (data: User) => {
  try {
    api.post('/user', data).then((res: AxiosResponse) => {
      console.log(res)
      if(res.status == 400) {
        redirect('/login')
      }
    });
  } catch(e: AxiosError | any) {
    console.log('Ops, deu ruim!');
    e.console.error();
  }
}
