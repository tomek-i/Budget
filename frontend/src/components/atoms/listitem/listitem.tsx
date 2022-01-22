import React, { createElement, Fragment } from 'react';
// import './listitem.css';

/**
 * list Props
 */
export interface ListItemProps {
  className?: string;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <Fragment>
      <li className={className} onClick={onClick} {...props}>
        {children}
      </li>
    </Fragment>
  );
};
