import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || import.meta.env.VITE_USE_MOCK_DATA === undefined

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardized API error logger
    const message = error.response?.data?.detail || error.message || 'An unexpected error occurred'
    console.warn(`[Lily API Error]: ${message}`, {
      status: error.response?.status,
      url: error.config?.url,
    })
    return Promise.reject(error)
  }
)

export default apiClient
