import { NextPage } from 'next';
import React from 'react';
import styles from '../../../styles/components/atoms/Input.module.css';

interface Input {
  type?: 'text' | 'password' | 'number' | 'submit';
  value?: string | number;
  placeholder?: string;
  label?: string;
  onChange?: Function;
  onSubmit?: Function;
}

const Input: NextPage<Input> = ({
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
        <label htmlFor={alphaCharFilter(label?.toLowerCase())}>{label}</label>
      )}
      <input
        name={alphaCharFilter(label?.toLowerCase())}
        className={styles.input}
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

export default Input;
