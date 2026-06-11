import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Input } from '../components/Input';
import { loginRequest, googleSignInRequest } from '../api/signIn';
import '../styles/pages/Login.scss';

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Email = {
  error: boolean;
  value: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<Email>({
    error: false,
    value: '',
  });
  const [password, setPassword] = useState<string>('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Trim value and convert to lower case
    const value = e.target.value.trim().toLocaleLowerCase();
    //Test if is valid
    const isValid = emailValidator.test(value);
    setEmail({
      error: !isValid,
      value,
    });
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (email.error) return;
    loginRequest(email.value, password, navigate);
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>Login</h1>
        <Input
          type="text"
          name="email"
          placeholder="Enter email"
          value={email.value}
          onChange={handleEmail}
          style={commonStyles}
        />
        {email.error && <p>Please enter a valid email address.</p>}
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePassword}
          style={commonStyles}
        />
        <button className="btn btn-login" onClick={handleSubmit}>
          Login
        </button>

        <p style={{ marginTop: '0.5rem', fontSize: '14px', textAlign: 'center' }}>
          No account?{' '}
          <Link to="/register" style={{ color: '#001a4f', fontWeight: 'bold' }}>
            Create one
          </Link>
        </p>
        <div className="line">or</div>
        <div className="login-google">
          <GoogleLogin
            onSuccess={(response: CredentialResponse) => {
              if (response.credential) {
                googleSignInRequest(response.credential, navigate);
              }
            }}
            onError={() => {
              console.error('Google login failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export const commonStyles = {
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
