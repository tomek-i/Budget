import React from 'react';

export type IconButtonProps = {
  text: string;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  disabled?: boolean;
  iconSide: 'left' | 'right';
  icon: React.SVGProps<SVGSVGElement>;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  name,
  text,
  disabled,
  iconSide,
  icon,
}) => {
  const spacing = iconSide === 'left' ? 'ml-2' : 'mr-2';
  return (
    <button
      disabled={disabled}
      name={name}
      className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
      onClick={onClick}
    >
      {iconSide === 'left' && icon}
      <span className={`xs:block ${spacing}`}>{text}</span>
      {iconSide === 'right' && icon}
    </button>
  );
};
