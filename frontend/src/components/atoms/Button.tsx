import { NextPage } from 'next';
import React from 'react';

interface Button {
  text: string;
}

const Button: NextPage<Button> = ({ text }) => {
  return <button>{text}</button>;
};

export default Button;
