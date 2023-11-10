import React, { useState } from 'react';
import { FaGooglePlusSquare } from 'react-icons/fa';
import { InputLogin } from '../components/Input';
import '../styles/pages/Login.scss';

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginPage = () => {
  const [email, setEmail] = useState<any | null>({
    error: false,
    value: '',
  });
  const [password, setPassword] = useState<any | null>('');

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

  return (
    <div className="login">
      <div className="login-form">
        <h1>Login</h1>
        <InputLogin
          type="text"
          name="email"
          placeholder="Enter email"
          value={email.value}
          onChange={handleEmail}
          style={Styles}
        />
        {email.error && <p>Please enter a valid email address.</p>}
        <InputLogin
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePassword}
          style={Styles}
        />
        <button className="btn btn-login">Login</button>

        <div className="line">or</div>
        <div className="login-google">
          <FaGooglePlusSquare className="icon-google" />
          <button className="btn btn-google">Login with Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export const Styles = {
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
