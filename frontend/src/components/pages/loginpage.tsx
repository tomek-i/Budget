import { useAppDispatch } from '../../app/hooks';
import React, { useState } from 'react';
import { LoginForm } from '../molecules/loginForm/loginform';
import { useLoginMutation } from '../../app/features/api/auth/auth';
import { Navigate } from 'react-router-dom';
import { login } from '../../app/features/user/userSlice';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [auth, { data, error, isSuccess }] = useLoginMutation();

  if (isSuccess) {
    let result = login(data.user);
    localStorage.setItem('accessToken', data.jwt);
    dispatch(result);
    return <Navigate to="/" />;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <LoginForm
      onSubmit={async (username, password) => {
        await auth({ identifier: username, password });
      }}
    />
  );
};
