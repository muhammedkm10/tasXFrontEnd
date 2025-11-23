import React, { useState } from "react";
import InputField from "../ui elements/InputField";
import { loginUser } from "../api/api_functions";
import { validateLogin } from "../validations/validateLogin";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleLogin() {
    const validationErrors = validateLogin(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const result = await loginUser(form);

    if (result.success) {
      alert("🎉 Login successful!");

      // Save access/refresh tokens if backend returns them
      localStorage.setItem("access", result.data.access);
      localStorage.setItem("refresh", result.data.refresh);

      navigate("/home");
    } else {
      alert("❌ " + result.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Login to Your Account
        </h2>

        <div className="space-y-4">
          {/* USERNAME */}
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username}</p>
          )}

          {/* PASSWORD */}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
