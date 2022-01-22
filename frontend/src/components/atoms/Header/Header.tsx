import React, { useState } from 'react';
import '../../../css/style.scss';
import { Hamburger } from '../Buttons/Hamburger';

export type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      {children}
    </header>
  );
};
