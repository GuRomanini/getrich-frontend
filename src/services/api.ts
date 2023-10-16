import axios, { AxiosResponse } from 'axios';

import { redirect } from 'next/navigation'

import { SigninData, User } from '../types/user'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
});

/* --------------------------------- Session -------------------------------- */
export const signin = async (data: SigninData) => axios({
  method: 'post',
  url: '/auth',
  data
}).then((res: AxiosResponse) => {
  if(res.status == 400) {
    redirect('/dashboard');
  }
});

/* ---------------------------------- User ---------------------------------- */
export const signup = async (data: User) => axios({
  method: 'post',
  url: '/user',
  data
});