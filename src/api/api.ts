import axios, { AxiosResponse } from 'axios';
import { NewUser, SigninData } from '../types/user'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
})

/* --------------------------------- Session -------------------------------- */
export const signin = async (data: SigninData, verbose: boolean = false) => {
  if(verbose)
    console.log("Enviando requisição de login para o servidor...")

  const res = await api.post('/user/login', data).then((res: AxiosResponse) => {
    if(verbose) {
      console.log("Login bem sucedido!\nResposta do servidor:")
      console.log(res.data)
    }
    
    return res.data.data
  }).catch((err) => {
    if(verbose) {
      if(err.response) {
        console.log("Erro no login. Confira seu usuário e sua senha e tente novamente.")
        console.log(err.response.data)
        console.log(`Status da resposta: ${err.response.status}`)
      }
      
      console.log(`Error: ${err.message}`)
    }

    return null
  })

  return res
}

/* ---------------------------------- User ---------------------------------- */
export const signup = async (data: NewUser, verbose: boolean = false) => {
  if(verbose)
    console.log("Enviando requisição de cadastro para o servidor...")
  
  const res = await api.post('/user', data).then((res: AxiosResponse) => {
    if(verbose) {
      console.log("Usuário cadastrado com sucesso!\nResposta do servidor:")
      console.log(res.data)
    }

    return true
  }).catch((err) => {
    if(verbose) {
      if(err.response) {
        console.log("Erro ao cadastrar usuário.")
        console.log(err.response.data)
        console.log(`Status da resposta: ${err.response.status}`)
      }
      
      console.log(`Error: ${err.message}`)
    }

    return false
  })

  return res
}
