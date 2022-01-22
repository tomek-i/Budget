import React, { createElement } from 'react';
// import './list.css';

/**
 * list Props
 */
export interface ListProps {
  className?: string;
  type: 'unordered' | 'ordered';
}

const listTypes: { [key: string]: string } = {
  unordered: 'ul',
  ordered: 'ol',
};
export const List: React.FC<ListProps> = ({
  className,
  children,
  type = 'unordered',
  ...props
}) => {
  return createElement(listTypes[type], {
    children,
    className,
    ...props,
  });
};
