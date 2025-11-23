export async function registerUser(data) {
  try {
    const response = await apiClient.post(, data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Registration failed",
    };
  }
}