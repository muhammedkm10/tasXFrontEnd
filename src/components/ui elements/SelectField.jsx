import React from "react";

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
