import type { NextPage } from 'next';
import React, { useState } from 'react';
import Card from '../atoms/Card';
import Input from '../atoms/Input';
import Link from 'next/link';

interface SignupCard {
  title?: string;
  loginLink: string | object;
  onSubmit?: Function;
}

const SignupCard: NextPage<SignupCard> = ({ title, loginLink, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  return (
    <Card title={title} flow="column" width="25rem">
      <Input placeholder="Username" onChange={setUsername} />
      <Input placeholder="Email" onChange={setEmail} />
      <Input placeholder="password" type="password" onChange={setPassword} />
      <Input
        placeholder="confirm password"
        type="password"
        onChange={setPasswordConfirm}
      />

      <br />
      <Input
        type="submit"
        value="Signup"
        onSubmit={() => {
          if (onSubmit) {
            //TODO: validate password confirmation ??
            if (
              password.length >= Number(process.env.MIN_PASSWORD_LENGTH!) &&
              password === passwordConfirm
            ) {
              onSubmit({ username, email, password });
              console.log('Credentials:', username, email, password);
            }
          }
        }}
      />
      <span style={{ alignSelf: 'center' }}>
        <small>
          Already have an account?{' '}
          <Link href={loginLink}>
            <a>Login here</a>
          </Link>
          .
        </small>
      </span>
    </Card>
  );
};

export default SignupCard;
