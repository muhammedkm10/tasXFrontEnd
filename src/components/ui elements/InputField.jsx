import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({ label, type = "text", name, value, onChange }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>

      <div className="relative">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg p-2 pr-10"
        />

        {isPassword && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
}

export default InputField;
