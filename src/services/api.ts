import axios, { AxiosResponse } from 'axios';

import { redirect } from 'next/navigation'

import { SigninData, User } from '../types/user'

export const api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  }, 
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

/* --------------------------------- Session -------------------------------- */
export const signin = async (data: SigninData) => api({
  method: 'post',
  url: '/auth',
  data
}).then((res: AxiosResponse) => {
  if(res.status == 400) {
    redirect('/dashboard');
  }
});

/* ---------------------------------- User ---------------------------------- */
export const signup = async (data: User) => api({
  method: 'post',
  url: '/user',
  data
}).then((res: AxiosResponse) => {
  console.log(res)
  if(res.status == 400) {
    redirect('/login')
  }
});