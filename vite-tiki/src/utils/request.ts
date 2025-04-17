import axios from 'axios'

const request = axios.create({
  baseURL: 'https://tiki.vn/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default request
