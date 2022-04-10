import { UserService } from './UserService';
import * as jwt from 'jsonwebtoken';

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};
export type LoginUserData = {
  username?: string;
  email?: string;
  password: string;
};
const register = async (data: RegisterUserData) => {
  // Our register logic starts here
  // Get user input
  const { username, email, password } = data;

  // Validate user input
  if (!(email && password && username)) {
    throw new Error('All input is required');
  }

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await UserService.getByEmail(email);

  if (oldUser) {
    //   return res.status(409).send('User Already Exist. Please Login');
    throw new Error('409: User Already Exist');
  }

  // Creating a unique salt for a particular user

  // Create user in our database
  const user = await UserService.create({ email, password, username });

  if (!user) throw new Error('Issue creating user.');
  if (!process.env.TOKEN_KEY) throw new Error('TOKEN_KEY is not set.');

  // Create token
  return jwt.sign({ id: user.id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  });
};

const login = async (data: LoginUserData) => {
  let identity = data.username ?? data.email;
  let password = data.password;

  if (!identity) throw new Error('You need to provide a username or email.');
  if (!password) throw new Error('You need to provide a password.');

  const user = await UserService.getByIdentity(identity);

  if (user && user.checkPassword(password)) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_KEY!,
      {
        expiresIn: '2h',
      },
    );
    console.log('return user dto');
    return { ...user, token };
  }
  throw new Error('Invalid credentials.');
};

export const AuthService = { register, login };
