


// === src/api/apiUrls.js ===
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("api url",API_BASE_URL);



export const AUTH_URLS = {
LOGIN: '/auth-routes/login/' ,
REGISTER: '/auth-routes/register/',
ME: '/auth-routes/user-profile/',
ALL_USERS: '/auth-routes/all-users/',
};



export const TASK_URLS = {
LIST_CREATE: '/tasks-routes/tasks/',
GET_UPDATE: (id) => `/tasks-routes/tasks/${id}/`,
ASSIGN_USER: (task_id,user_id) => `/tasks-routes/tasks/${task_id}/assign-user/${user_id}/`,
BULK_CREATE: '/tasks-routes/tasks/bulk-create/',


// tag api urls
TAG_LIST : '/tasks-routes/tags/',

};