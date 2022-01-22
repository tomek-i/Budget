import React, { ReactChild, ReactChildren, ReactNode } from 'react';
import useContextMenu from '../../../hooks/useContextMenu';
import { ContextMenuItem, ContextMenuItemProps } from './contextMenuItem';

import './contextMenu.css';

interface ContextMenuProps {
  // items?: ContextMenuItemProps[] | ReactChild | ReactChildren;
  visible?: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  // items,
  visible = false,
  children,
}) => {
  const { anchorPoint, show } = useContextMenu(Boolean(visible));

  const isDisabled = (value: boolean) => {
    console.log({ value });
    return value === false ? 'menu-item-disabled' : '';
  };

  const isSeparator = (text: string) => {
    return text === '-' ? 'menu-separator' : '';
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return (
        <li
          key={index}
          className={`menu-item ${isDisabled(
            child.props.enabled,
          )} ${isSeparator(child.props.text)}`}
        >
          {React.cloneElement(child)}
        </li>
      );
    }
    return child;
  });
  console.log('childrenWithProps', childrenWithProps);
  if (show) {
    return (
      <ul
        className={'menu ' + (show ? 'menu-show' : '')}
        style={{ top: anchorPoint.y, left: anchorPoint.x }}
      >
        {childrenWithProps}
      </ul>
    );
  }
  return <></>;
};
