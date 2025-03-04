import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
  return (
    <input
      type="checkbox"
      className={`rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
};

export default Checkbox;
