import React from 'react'
import { useState } from 'react';

function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");


return (
<div>
<h2 className="text-xl font-semibold mb-2">Login</h2>
<input className="border p-2 mr-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
<input className="border p-2 mr-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
<button className="bg-blue-500 text-white px-4 py-2">Login</button>
</div>
);
}

export default Login;