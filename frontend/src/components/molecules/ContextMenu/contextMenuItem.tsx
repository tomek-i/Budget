import React, { Children, ReactChild, ReactChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './contextMenuItem.css';

export interface ContextMenuItemProps {
  text: string;
  onClick?: () => void;
  enabled?: boolean;
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  text,
  enabled = true,
  onClick,
  children,
}) => {
  console.log('ENABLED', text, enabled);

  const comp = (isSeparator: boolean) => {
    if (!isSeparator) {
      return (
        <button
          type="button"
          className="menu-btn"
          onClick={(e) => {
            if (enabled) {
              onClick?.();
            }
          }}
        >
          {children}
          <span className="menu-text">{text}</span>
        </button>
      );
    }
    return <></>;
  };

  return comp(text === '-');
};

export const ContextMenuItemOpen: React.FC<ContextMenuItemProps> = ({
  text = 'Open',
  onClick,
  enabled,
}) => {
  return (
    <ContextMenuItem text={text} onClick={() => onClick?.()} enabled={enabled}>
      <FontAwesomeIcon icon={faBoxOpen} />
    </ContextMenuItem>
  );
};
