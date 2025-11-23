import React from 'react';


export default function InputField({ label, type="text", value, onChange, placeholder }) {
return (
<div className="mb-3">
{label && <label className="block text-sm mb-1">{label}</label>}
<input
type={type}
value={value}
onChange={onChange}
placeholder={placeholder}
className="w-full p-2 border rounded"
/>
</div>
);
}