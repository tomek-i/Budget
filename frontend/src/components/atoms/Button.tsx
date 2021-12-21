import { NextPage } from 'next';
import React from 'react';

interface Button {
  text: string;
  onClick?: Function;
}

const Button: React.FC<Button> = ({ text, onClick }) => {
  return <button onClick={() => onClick && onClick()}>{text}</button>;
};

export default Button;
