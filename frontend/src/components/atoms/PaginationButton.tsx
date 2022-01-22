import React from 'react';
import { Button } from './Buttons/Button';

export interface IPaginationButton {
  border?: 'default';
  type?: 'default' | 'previous' | 'next';
  current?: boolean;
  number?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const PaginationButton: React.FC<IPaginationButton> = ({
  number,
  current,
  type,
  onClick,
  disabled = false,
}) => {
  if (type === 'previous') {
    return <Button onClick={onClick} text={'<'} />;
  }

  if (type === 'next') {
    return <Button onClick={onClick} text={'>'} />;
  }

  return <span onClick={() => onClick && onClick()}>{number}</span>;
};

export default PaginationButton;
