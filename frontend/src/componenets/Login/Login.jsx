import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

function LoginForm() {
  const {login} = useLogin();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    login(formData);
    console.log('Login submitted:', formData);
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to='/signup'>Don't have an account</Link>
      </form>
    </div>
  );
}

export default LoginForm;
