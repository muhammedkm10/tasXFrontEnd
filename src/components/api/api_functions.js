import  {apiClientMultipart ,apiClient}  from './services';
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
export async function fetchTasks(params = {}) {
    console.log("params",params);
    
  try {
    const response = await apiClient.get(TASK_URLS.LIST_CREATE, { params });

    return {
      success: true,
      data: response.data.results,
      pagination: {
        next: response.data.next,
        prev: response.data.previous,
        count: response.data.count,
      },
    };
  } catch (error) {
    console.log("Fetch Tasks Error:", error);

    let message = "Failed to load tasks";

    if (error.response?.data?.detail) {
      message = error.response.data.detail;
    }

    return {
      success: false,
      message,
    };
  }
}

///////////////////////////////////////////////////////////////// fetch single task //////////////////////////////////////
// GET single task
export async function fetchSingleTask(id) {
    console.log("id",id);
    
  try {
    const response = await apiClient.get(TASK_URLS.GET_UPDATE(id));

    console.log("response data",response);
      return {
      success: true,
      data: response.data,
    };
    
  } catch (error) {
    console.log("Fetch Single Task Error:", error);

    let message = "Failed to load task";

    if (error.response?.data?.detail) {
      message = error.response.data.detail;
    }

    return {
      success: false,
      message,
    };
  }
}




////////////////////////////////////////////////////////////////// crate update  task /////////////////////////////////////
// CREATE task
export const createTask = (data) =>
  apiClientMultipart.post(TASK_URLS.LIST_CREATE, data);

// UPDATE task
export const updateTask = (id, data) =>
  apiClientMultipart.patch(TASK_URLS.GET_UPDATE(id), data);

// CREATE task/UPDATE task
export async function handleTaskSubmit(taskId, data) {
    console.log("data",data);
    
  try {
    let response;

    if (taskId) {
      response = await updateTask(taskId, data);
    } else {
      response = await createTask(data);
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("Task API Error:", error);

    let message = "Task operation failed";

    if (error.response?.data?.detail) {
      message = error.response.data.detail;
    }

    return {
      success: false,
      message,
    };
  }
}



// bulk create tasks
export async function bulkCreateTask(data) {
    console.log("data",data);
    
  try {
    const response = await apiClient.post(TASK_URLS.BULK_CREATE, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Bulk Task API Error:", error);

    let message = "Bulk task creation failed";

    if (error.response?.data?.detail) {
      message = error.response.data.detail;
    } else if (error.response?.data) {
      message = JSON.stringify(error.response.data);
    }

    return {
      success: false,
      message,
    };
  }
}







/////////////////////////////////////////////////////////// DELETE task (soft delete)///////////////////////////////////////////////
export const deleteTask = async (id) => {
  try {
    const response = await apiClient.delete(TASK_URLS.GET_UPDATE(id));
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Failed to delete task:", error);
    // Optional: extract error message if backend sends it
    const message =
      error.response?.data?.message || "Something went wrong while deleting the task.";
    return { success: false, message };
  }
};









//   fetch all tags
export async function fetchAllTags() {
  try {
    const response = await apiClient.get(TASK_URLS.TAG_LIST);
    console.log("my response",response);
    
    return {
        success: true,
        data: response.data.results,
        };
    } catch (error) {
    console.log("Fetch Tags Error:", error);
    let message = "Failed to load tags";
    if (error.response?.data?.detail) {
        message = error.response.data.detail;
    }
    return {
        success: false,
        message,
    };
  }
}




// fetch user profile
export const fetchProfile = async () => {
  try {
    const res = await apiClient.get(AUTH_URLS.ME);
    console.log("response",res);
    
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};


// fetch all users
export const fetchUsers = async () => {
  try {
    const res = await apiClient.get(AUTH_URLS.ALL_USERS);
    console.log("users response",res);
    return { success: true, data: res.data };
    } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message }; 
    }
};



// assign user to task
export const assignUserToTask = async (userId, taskId) => {
    console.log("user id ",userId,taskId);
    
  try {
    const res = await apiClient.post(TASK_URLS.ASSIGN_USER(taskId, userId));
    return { success: true, data: res.data };
  } catch (err) {
    console.error(err);
    return { success: false, message: err.response?.data || err.message };
  }
};

