import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value?: string;
  children?: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ value, children, className = '', ...props }) => {
  return (
    <label
      {...props}
      className={`block font-medium text-sm text-gray-700 ${className}`}
    >
      {value ?? children}
    </label>
  );
};

export default Label;