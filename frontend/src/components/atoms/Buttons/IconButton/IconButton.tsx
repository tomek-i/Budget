import React from 'react';

export type IconButtonProps = {
  text?: string;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  disabled?: boolean;
  iconSide: 'left' | 'right';
  className?: string;
  icon: React.SVGProps<SVGSVGElement> | any; //any because we can add fontawesomeicon
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  name,
  text,
  disabled,
  iconSide,
  icon,
  className,
}) => {
  let spacing = iconSide === 'left' ? 'ml-2' : 'mr-2';
  if (!text) spacing = '';
  return (
    <button
      disabled={disabled}
      name={name}
      className={`btn bg-indigo-500 hover:bg-indigo-600 text-white ${className}`}
      onClick={onClick}
    >
      {iconSide === 'left' && icon}
      <span className={`xs:block ${spacing}`}>{text}</span>
      {iconSide === 'right' && icon}
    </button>
  );
};
