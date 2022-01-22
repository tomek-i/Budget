import React from 'react';
import { useAppSelector } from '../../../app/hooks';

export interface HomeProps {}

export const HomePage: React.FC<HomeProps> = () => {
  const user = useAppSelector((state) => state.user);

  return <div className="text-2xl bg-slate-400">HOME {user.username}</div>;
};
