import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLoginMutation } from '../../../../app/features/api/authApi';
import { login } from '../../../../app/features/user/userSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { LoginForm } from '../../../molecules/LoginForm';
import '../../../../css/style.scss';

export type LoginPageProps = {};

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [auth, { data, error, isSuccess }] = useLoginMutation();

  if (isSuccess) {
    let result = login(data);
    localStorage.setItem('accessToken', data.token);
    dispatch(result);

    return <Navigate to="/" />;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <LoginForm
        onSubmit={async (username, password) =>
          await auth({ username, password })
        }
      />
    </>
  );
};
