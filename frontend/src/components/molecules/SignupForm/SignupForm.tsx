import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/style.scss';

export type SignupFormProps = {
  onSubmit: (
    username: string,
    password: string,
    email: string,
    mobile: string,
  ) => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('tomek');
  const [password, setPassword] = useState('tomek');
  const [email, setEmail] = useState('tomek.iwainski@gmail.com');
  const [mobile, setMobile] = useState('041234567');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(username, password, email, mobile);
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="form-input w-full"
            type="text"
            autoComplete="on"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="mobile">
            Mobile
          </label>
          <input
            id="mobile"
            className="form-input w-full"
            type="tel"
            autoComplete="on"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
      </div>
      <div className="flex items-end  mt-6">
        <button
          type="submit"
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};
