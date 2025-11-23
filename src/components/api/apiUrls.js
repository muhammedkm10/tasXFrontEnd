// === src/api/apiUrls.js ===
export const API_BASE_URL = "http://localhost:8000/api";


export const AUTH_URLS = {
LOGIN: `${API_BASE_URL}/auth/login/`,
REGISTER: '/register/',
ME: '/auth/me/',
};



export const TASK_URLS = {
LIST: `${API_BASE_URL}/tasks/`,
DETAIL: (id) => `${API_BASE_URL}/tasks/${id}/`,
COMMENTS: (id) => `${API_BASE_URL}/tasks/${id}/comments/`,
ATTACH: (id) => `${API_BASE_URL}/tasks/${id}/attachments/`,
};