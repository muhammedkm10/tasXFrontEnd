import React from "react";

function TextareaField({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
}

export default TextareaField;
