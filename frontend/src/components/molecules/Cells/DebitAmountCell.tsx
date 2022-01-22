import React from 'react';
import Dropdown from '../../atoms/Dropdown';

export const DebitAmountCell = ({ value }: { value: number }) => {
  return <span style={{ color: 'red' }}>$ {Number(value)}</span>;
};
export const CreditAmountCell = ({ value }: { value: number }) => {
  return <span style={{ color: 'green' }}>$ {value}</span>;
};
export const BalanceCell = ({ value }: { value: number }) => {
  return <span>$ {value}</span>;
};

export const CategoryCell = (items: string[]) => {
  console.log('ITEMS: ', items);
  return <Dropdown items={items} />;
};
