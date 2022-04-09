import { useAppDispatch } from '../../../app/hooks';
import React, { useState } from 'react';
import { useLoginMutation } from '../../../app/features/api/auth/auth';
import { Navigate } from 'react-router-dom';
import { login } from '../../../app/features/user/userSlice';
import { LoginForm } from './../../../components/molecules/LoginForm';

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
    <>
      <LoginForm />
    </>
  );
};
