import React from 'react';
import '../../../css/style.scss';
import { Label, LabelProps } from '../Label';

export type CheckboxProps = {
  id?: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  disabled,
  checked,
}) => {
  const classes = disabled ? 'opacity-50' : 'cursor-pointer';
  return (
    <div className="form-check">
      <input
        id={id}
        className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 ${classes}`}
        type="checkbox"
        value=""
        disabled={disabled}
        checked={checked}
      />
      <Label text={label} disabled={disabled} />
    </div>
  );
};
