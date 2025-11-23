


// === src/api/apiUrls.js ===
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("api url",API_BASE_URL);



export const AUTH_URLS = {
LOGIN: '/auth-routes/login/' ,
REGISTER: '/auth-routes/register/',
ME: '/auth/me/',
};



export const TASK_URLS = {
LIST: '/task-routes/tasks/',
DETAIL: (id) => `${API_BASE_URL}/tasks/${id}/`,
COMMENTS: (id) => `${API_BASE_URL}/tasks/${id}/comments/`,
ATTACH: (id) => `${API_BASE_URL}/tasks/${id}/attachments/`,
};