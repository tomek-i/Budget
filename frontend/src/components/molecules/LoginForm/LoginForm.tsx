import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/style.scss';

export type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('tomek.iwainski@gmail.com');
  const [password, setPassword] = useState('tomek');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(username, password);
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            className="form-input w-full"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
        <button
          type="submit"
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};
