import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/style.scss';

export type LoginFormProps = {};

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  return (
    <form>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email Address
          </label>
          <input id="email" className="form-input w-full" type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="form-input w-full"
            type="password"
            autoComplete="on"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="mr-1">
          <Link
            className="text-sm underline hover:no-underline"
            to="/reset-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Link
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
          to="/"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};
