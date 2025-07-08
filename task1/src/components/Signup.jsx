import React, { useState } from 'react';

let Signup = ({ setActiveUser  }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Retrieve the list of users from local storage or initialize an empty array if it doesn't exist
        const users = JSON.parse(localStorage.getItem('users')) || [];
        // Check if there is already a user with the same email address
        const existingUser  = users.find(user => user.email === email);

        if (existingUser ) {
            alert("Email already registered");
            return;
        }

        const newUser  = { username, email, password };
        users.push(newUser );
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('activeUser ', JSON.stringify(newUser ));
        setActiveUser (newUser );
        alert("Signup successful!");
    };

    return (
    <div className="page-container">
        <div className="form-box">
            <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Signup</h1>
            <form onSubmit={handleSignup}>
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
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit" style={{ backgroundColor: '#333', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Signup</button>
                </div>
            </form>
        </div>
    </div>
);

};


export default Signup;

