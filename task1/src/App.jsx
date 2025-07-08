import React, { useState, useEffect } from 'react';
import Signup from './components/Signup'; 
import Login from './components/Login';

const App = () => {
    const [activeUser , setActiveUser ] = useState(null);
    const [showLogin, setShowLogin] = useState(false); 
    useEffect(() => {
        const user = localStorage.getItem('activeUser  ');
        if (user) {
            setActiveUser (JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('activeUser  ');
        setActiveUser (null);
        alert("Logged out successfully");
    };

    const toggleForm = () => {
        setShowLogin(!showLogin); 
    };

    return (
        <div className="container">
            {activeUser  ? (
                <div>
                    <h1>Welcome, {activeUser .username}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
        // Shows an alert that the login was successful
            ) : (
                <div>
                    {showLogin ? (
                        <>
                            <Login setActiveUser ={setActiveUser } />
                            <button onClick={toggleForm}>Go to Signup</button>
                        </>
                    ) : (
                        <>
                            <Signup setActiveUser ={setActiveUser } />
                            <button onClick={toggleForm}>Go to Login</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
