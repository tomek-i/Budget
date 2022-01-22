import React, { createElement, Fragment } from 'react';
// import './navigation.css';

export interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <nav className={className} {...props}>
      {children}
    </nav>
  );
};
