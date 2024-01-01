import React from 'react';

type InputProps = {
  type?: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style: { [key: string]: string };
  className?: string;
  message?: string;
};

export const Input = ({ type, name, placeholder, value, onChange, style, message }: InputProps) => {
  return (
    <>
      <label style={{ color: 'silver', width: '80%', fontSize: '18px' }} htmlFor={name}>
        {name[0].toLocaleUpperCase() + name.slice(1)}: {message}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        style={style}
        onChange={onChange}
      />
    </>
  );
};