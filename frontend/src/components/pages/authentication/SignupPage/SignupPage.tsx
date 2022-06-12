import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link, Navigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../../app/features/api/authApi';
import { login } from '../../../../app/features/user/userSlice';

import '../../../../css/style.scss';
import { SignupForm } from '../../../molecules/SignupForm';

export type SignupPageProps = {};

export const SignupPage: React.FC<SignupPageProps> = ({}) => {
  //TODO: when signing up a user, we should direclty sign them up with BASIQ
  const dispatch = useDispatch();
  const [
    signup,
    {
      requestId,
      status,
      data,
      error,
      endpointName,
      startedTimeStamp,
      fulfilledTimeStamp,
    },
  ] = useRegisterMutation();

  if (status === QueryStatus.fulfilled) {
    //TODO: so maybe we can send here another dispatch to signup with basiq??
    dispatch(login(data));
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SignupForm
              onSubmit={(username, password, email, mobile) =>
                signup({ username, password, email, mobile })
              }
            />
            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or <Link to="login"> Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
