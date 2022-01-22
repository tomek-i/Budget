import React from 'react';
import '../../../css/style.scss';

export type LabelProps = {
  text?: string;
  htmlFor?: string;
  disabled?: boolean;
};

export const Label: React.FC<LabelProps> = ({ text, htmlFor, disabled }) => {
  return (
    <label
      className={`form-check-label inline-block text-gray-800 ${
        disabled ? 'opacity-50' : ''
      }`}
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
};
