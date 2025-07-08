import React, { useState } from 'react';

// This is a functional component called Login that takes in a prop called setActiveUser
const Login = ({ setActiveUser  }) => {
    // This is a state variable that holds the email value
    const [email, setEmail] = useState('');
    // This is a state variable that holds the password value
    const [password, setPassword] = useState('');

    // This is a function that handles the login process
    const handleLogin = (e) => {
        // Prevents the default form submission
        e.preventDefault();

        // Retrieves the users from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        // Finds the user with the matching email and password
        const user = users.find(user => user.email === email && user.password === password);

        // If the user is not found, an alert is shown and the function returns
        if (!user) {
            alert("Invalid email or password");
            return;
        }
        // Logs a message to the console
        console.log("loged");

        // Sets the active user in local storage
        localStorage.setItem('activeUser ', JSON.stringify(user));
        // Sets the active user in the setActiveUser prop
        setActiveUser (user);
        alert("Login successful!");
    };

   return (
    <form onSubmit={handleLogin}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px'}}>Login</h1>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            margin: '0 auto',
             // Fixed background color
        }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </div>
    </form>
);

};

export default Login;
