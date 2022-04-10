import React, { useEffect } from 'react';
import { RouteProps, Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useGetUserMutation } from '../../../app/features/api/authApi';
import { login } from '../../../app/features/user/userSlice';

const ProtectedRoute: React.FC<RouteProps> = () => {
  const reduxToken = useAppSelector((state) => state.user.token);
  const localToken = localStorage.getItem('accessToken');
  const dispatch = useAppDispatch();
  const [getUser, { data, isLoading, isError, isSuccess }] =
    useGetUserMutation();

  console.log({ isSuccess, data, isError });

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(data));
    }
  }, [isSuccess]);

  useEffect(() => {
    async function getCurrentUser() {
      if (!reduxToken && localToken) {
        let r = await getUser(localToken);
        console.log({ r });
      }
    }

    getCurrentUser();
  }, [localToken, reduxToken]);

  if (!localToken) {
    return <Navigate to="/login" />;
  }

  if (reduxToken && localToken) {
    return <Outlet />;
  } else {
  }

  if (isError) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <Outlet />;
  }
  return <div>Loading...</div>;
};

export default ProtectedRoute;
