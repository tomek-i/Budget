import React from 'react';
import '../../../css/style.scss';

export type DropdownProps = {
  items?: any[];
};

export const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <select>
      {items?.map((item, i) => (
        <option key={i}>{item}</option>
      ))}
    </select>
  );
};
