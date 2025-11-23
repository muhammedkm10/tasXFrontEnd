import React, { useState } from "react";
import InputField from "../ui elements/InputField";
import { registerUser } from "../api/api_functions";
import { validateRegistration } from "../validations/validateRegistration";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  console.log("form data",form);
  const navigate = useNavigate();
  

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error while typing
  }

  async function handleRegister() {
    const validationErrors = validateRegistration(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submitting
    }

    const result = await registerUser(form);

    if (result.success) {
      alert("🎉 Registration successful!");
      setForm({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
      setErrors({});
      navigate("/login");
    } else {
      // API error from backend
      alert("❌ " + result.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Create an Account
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

          {/* EMAIL */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
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

          {/* CONFIRM PASSWORD */}
          <InputField
            label="Confirm Password"
            type="password"
            name="password2"
            value={form.password2}
            onChange={handleChange}
          />
          {errors.password2 && (
            <p className="text-red-600 text-sm">{errors.password2}</p>
          )}

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
