import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    'API-KEY': 'ce115b42-8dcb-4454-9f6c-beddc544d708',
  },
})
