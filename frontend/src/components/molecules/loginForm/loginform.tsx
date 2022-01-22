import React, { useState } from 'react';
import './loginform.css';
import { Input } from '../../atoms/input/input';
import { Form } from '../../atoms/form/form';

export interface LoginFormProps {
  className?: string;
  onSubmit: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  className,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      className={className}
      onSubmit={(e) => {
        onSubmit(username, password);
      }}
    >
      <Input label="Username" value={username} onChange={setUsername} />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <Input type="submit" />
    </Form>
  );
};
