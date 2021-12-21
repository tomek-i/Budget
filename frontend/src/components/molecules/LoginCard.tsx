import type { NextPage } from 'next';
import React, { useState } from 'react';
import Card from '../atoms/Card';
import Input from '../atoms/Input';
import Link from 'next/link';

interface LoginCard {
  title?: string;
  forgotPasswordLink: string | object;
  signUpLink: string | object;
  onSubmit?: Function;
}

const LoginCard: React.FC<LoginCard> = ({
  title,
  forgotPasswordLink,
  signUpLink,
  onSubmit,
}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <Card title={title} flow="column" width="25rem">
      <Input label="Username:" onChange={setUsername} />
      <Input label="Password:" type="password" onChange={setPassword} />
      <span style={{ alignSelf: 'end' }}>
        <small>
          <Link href={forgotPasswordLink}>
            <a>Forgot password?</a>
          </Link>
        </small>
      </span>
      <br />
      <Input
        type="submit"
        value="Login"
        onSubmit={() => {
          if (onSubmit) {
            onSubmit({ username, password });
          }
          console.log('Credentials:', username, password);
        }}
      />
      <span style={{ alignSelf: 'center' }}>
        <small>
          Don't have an account?{' '}
          <Link href={signUpLink}>
            <a>Sign up now</a>
          </Link>
          .
        </small>
      </span>
    </Card>
  );
};

export default LoginCard;
