import React, { useState } from 'react';
import { registerStudent } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', firstname: '', lastname: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerStudent(formData.email, formData.password, formData.firstname, formData.lastname);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/login');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="firstname" placeholder="First Name" onChange={handleChange} required />
        <input name="lastname" placeholder="Last Name" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;