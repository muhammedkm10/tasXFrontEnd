import axios from 'axios';
import { API_BASE_URL } from './apiUrls';


const apiClient = axios.create({
baseURL: API_BASE_URL,
headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
const token = localStorage.getItem('access');
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If token is invalid or expired
    if (error.response && error.response.status === 401) {
      // Remove token
      localStorage.removeItem('access');

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);




const apiClientMultipart = axios.create({
  baseURL: API_BASE_URL,
});

// Add token automatically
apiClientMultipart.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// Same error handling as normal client
apiClientMultipart.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { apiClientMultipart, apiClient};