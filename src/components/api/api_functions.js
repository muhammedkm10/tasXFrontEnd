import  apiClient  from './services';
import { API_BASE_URL, AUTH_URLS, TASK_URLS } from './apiUrls';


// register user function
export async function registerUser(data) {
  try {
    const response = await apiClient.post(AUTH_URLS.REGISTER, data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("Registration API Error:", error);

    let message = "Registration failed";

    if (error.response?.data) {
      // Handle Django serializer errors
      message =
        error.response.data.username?.[0] ||
        error.response.data.email?.[0] ||
        error.response.data.password?.[0] ||
        error.response.data.password2?.[0] ||
        error.response.data.detail ||
        message;
    }

    return {
      success: false,
      message,
    };
  }
}



// login api function
export async function loginUser(data) {
  try {
    const response = await apiClient.post(AUTH_URLS.LOGIN, data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("Login API Error:", error);

    let message = "Login failed";

    if (error.response?.data) {
      message =
        error.response.data.detail ||   // SimpleJWT error
        message;
    }

    return {
      success: false,
      message,
    };
  }
}






// GET tasks with pagination, filters, search, ordering
export const fetchTasks = (params) =>
  apiClient.get(TASK_URLS.LIST, { params });

// GET single task
export const fetchTask = (id) =>
  apiClient.get(`/tasks/${id}/`);

// CREATE task
export const createTask = (data) =>
  apiClient.post("/tasks/", data);

// UPDATE task
export const updateTask = (id, data) =>
  apiClient.patch(`/tasks/${id}/`, data);

// DELETE task (soft delete)
export const deleteTask = (id) =>
  apiClient.delete(`/tasks/${id}/`);

// BULK CREATE
export const bulkCreateTask = (data) =>
  apiClient.post("/tasks/bulk-create/", data);

// ADD COMMENT
export const createComment = (data) =>
  apiClient.post("/comments/", data);

// UPLOAD FILE
export const uploadFile = (formData) =>
  apiClient.post("/files/", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });


  