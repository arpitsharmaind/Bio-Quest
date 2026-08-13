import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
})

// Attach the Sanctum bearer token (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bq_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401, clear the stored token so the app falls back to the login screen.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bq_token')
    }
    return Promise.reject(error)
  },
)

export default api
