import React from 'react';

interface Dropdown {
  items?: any[];
}

const Dropdown: React.FC<Dropdown> = ({ items }) => {
  return (
    <select>
      {items?.map((item, i) => (
        <option key={i}>{item}</option>
      ))}
    </select>
  );
};

export default Dropdown;
