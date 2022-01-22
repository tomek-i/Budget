import React from 'react';
// import './input.css';

export interface InputProps {
  type?: 'text' | 'password' | 'number' | 'submit';
  value?: string | number;
  placeholder?: string;
  label?: string;
  onChange?: Function;
  onSubmit?: Function;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  label,
  onChange,
  onSubmit,
}) => {
  const alphaCharFilter = (label?: string): string | undefined => {
    if (!label) return label;
    return label.replace(/[^a-z]/gi, '');
  };

  return (
    <>
      {label && (
        <>
          <label
            className="bg-slate-500"
            htmlFor={alphaCharFilter(label?.toLowerCase())}
          >
            {label}
          </label>{' '}
        </>
      )}
      <input
        name={alphaCharFilter(label?.toLowerCase())}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        onClick={(e) => {
          if (type !== 'submit') return;
          onSubmit && onSubmit(e);
        }}
      ></input>
    </>
  );
};
