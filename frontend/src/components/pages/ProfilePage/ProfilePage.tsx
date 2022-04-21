import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useAuthenticateBankMutation,
  useCreateBankConnectionMutation,
  useCreateBankUserMutation,
} from '../../../app/features/api/bankApi';
import { useUpdateUserMutation } from '../../../app/features/api/userApi';
import { useAppSelector } from '../../../app/hooks';
import '../../../css/style.scss';

export type ProfilePageProps = {};

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const user = useAppSelector((state) => state.user);

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
  ] = useCreateBankUserMutation();

  const [
    connectBank,
    {
      status: connectBankStatus,
      data: connectBankData,
      error: connectBankError,
    },
  ] = useCreateBankConnectionMutation();

  const [
    updateUser,
    {
      isLoading: userUpdating,
      isSuccess: userSuccess,
      isError: isUserError,
      error: userError,
    },
  ] = useUpdateUserMutation();
  console.log({ status, data, error });

  // const [login, { data: BankData, error: BankError, isSuccess: BankSuccess }] =
  //   useAuthenticateBankMutation();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setMobile(user.mobile);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      const { id } = data;

      updateUser({ ...user, basiqId: id });
      console.log({ id });
    }
  }, [data]);

  useEffect(() => {
    console.log({ connectBankData });

    // if (connectBankData) {
    //   window.location = connectBankData;
    // }
  }, [connectBankData]);

  useEffect(() => {
    console.log({ userSuccess, userUpdating, isUserError, userError });
  }, [userSuccess]);

  console.log({ user });
  return (
    <div className="mt-4 mx-4">
      <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
        Profile
      </h1>

      <form className="flex flex-col justify-center">
        <div className="flex flex-col">
          <label htmlFor="username" className="hidden">
            Username
          </label>
          <input
            type="name"
            name="username"
            id="username"
            placeholder="Username"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="hidden">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="tel" className="hidden">
            Mobile Number
          </label>
          <input
            type="tel"
            name="tel"
            id="tel"
            placeholder="Mobile Number"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();

            //TODO: if the email/mobile changes and we have a basiqId set, we should also update the banking

            alert('TODO: update');
          }}
          type="submit"
          className="md:w-32 bg-blue-600 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 hover:bg-blue-500 dark:hover:bg-gray-200 transition ease-in-out duration-300"
        >
          Submit
        </button>
      </form>

      <h1 className="mt-6 text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
        Bank Connection
      </h1>

      <button
        className="md:w-32 bg-blue-600 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 hover:bg-blue-500 dark:hover:bg-gray-200 transition ease-in-out duration-300"
        onClick={async () => {
          //step 1: register to banq
          //step 2: authenticate with bank
          //step 3: ???
          console.log({ email, mobile });
          if (email || mobile) {
            //TODO: this is the bank/basiq login, this should always be loggedin?!

            //TODO: because basiq does not check if a user has been already created, if user.basiqId is set, then we should call an update

            if (!user.basiqId) signup({ email, mobile });

            if (user.basiqId) {
              connectBank({ id: user.basiqId });
            }
          }
        }}
      >
        CONNECT
      </button>
      <br />
      {user.basiqId}
    </div>
  );
};
