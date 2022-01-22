import React from 'react';
import { Button } from '../Button';
import '../../../../css/style.scss';

export type HamburgerProps = {
  onClick?: () => void;
  text: string;
};

export const Hamburger: React.FC<HamburgerProps> = ({ onClick, text }) => {
  return (
    <Button
      className="text-gray-500 hover:text-gray-600 lg:hidden"
      // aria-controls="sidebar"
      onClick={onClick}
    >
      <span className="sr-only">{text}</span>
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="5" width="16" height="2" />
        <rect x="4" y="11" width="16" height="2" />
        <rect x="4" y="17" width="16" height="2" />
      </svg>
    </Button>
  );
};
