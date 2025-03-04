import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ disabled = false, ...props }) => {
  return (
    <input
      disabled={disabled}
      {...props}
      className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${props.className || ''}`}
    />
  );
};

export default Input;
