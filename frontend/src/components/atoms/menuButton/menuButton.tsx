import React, { Children, ReactChild, ReactChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

interface MenuButtonProps {
  text: string;
  onClick: () => void;
  enabled: boolean;
  children: ReactChild | ReactChildren;
}

export const ContextMenuItem: React.FC<MenuButtonProps> = ({
  text,
  enabled = true,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className="menu-btn"
      onClick={(e) => {
        if (enabled) onClick();
      }}
    >
      {children}
      <span className="menu-text">{text}</span>
    </button>
  );
};

export const MenuBottonOpen: React.FC<MenuButtonProps> = ({
  text = 'Open',
  onClick,
  enabled,
}) => {
  return (
    <ContextMenuItem text={text} onClick={() => onClick()} enabled={enabled}>
      <FontAwesomeIcon icon={faBoxOpen} />
    </ContextMenuItem>
  );
};
