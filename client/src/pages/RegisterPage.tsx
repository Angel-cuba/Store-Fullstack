import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { registerRequest } from '../api/signIn';
import '../styles/pages/Login.scss';

const inputStyle: React.CSSProperties = {
  width: '300px',
  height: '40px',
  borderRadius: '15px',
  border: '1px solid #cccccc22',
  padding: '2px 5px',
  fontSize: '16px',
  marginBottom: '10px',
  textAlign: 'center',
  color: '#333',
  outline: 'none',
  fontWeight: 'bold',
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', lastname: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    const { name, lastname, email, password } = form;
    if (!name || !lastname || !email || !password) return;
    setLoading(true);
    await registerRequest({ name, lastname, email, password }, navigate);
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>Create Account</h1>
        <Input
          type="text"
          name="name"
          placeholder="First name"
          value={form.name}
          onChange={handleChange('name')}
          style={inputStyle}
        />
        <Input
          type="text"
          name="lastname"
          placeholder="Last name"
          value={form.lastname}
          onChange={handleChange('lastname')}
          style={inputStyle}
        />
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange('email')}
          style={inputStyle}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange('password')}
          style={inputStyle}
        />
        <button className="btn btn-login" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
        <p style={{ marginTop: '1rem', fontSize: '14px', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#001a4f', fontWeight: 'bold' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
