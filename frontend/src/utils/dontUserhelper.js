import React, { useState } from 'react';

const SimpleForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => /^[a-zA-Z0-9_]{3,15}$/.test(username);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    if (!validateUsername(username)) {
      setError('Username must be 3-15 characters and can include letters, numbers, and underscores');
      return;
    }
    setError('');
    // Proceed with form submission
    console.log('Form submitted:', { email, username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
