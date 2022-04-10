import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import '../../../css/style.scss';
import { Label } from '../../atoms/Label';
import { PageTemplateWrapper } from '../PageTemplateWrapper';

export type ProfilePageProps = {};

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const user = useAppSelector((state) => state.user);
  console.log({ user });
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  return (
    <PageTemplateWrapper>
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
              defaultValue={username}
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
              defaultValue={email}
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
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();

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
      </div>
    </PageTemplateWrapper>
  );
};
