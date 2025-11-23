import React from 'react'
import { useState } from 'react';


function Register() {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


return (
<div>
<h2 className="text-xl font-semibold mb-2">Register</h2>
<input className="border p-2 mr-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
<input className="border p-2 mr-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
<input className="border p-2 mr-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
<button className="bg-green-500 text-white px-4 py-2">Signup</button>
</div>
);
}

export default Register;
