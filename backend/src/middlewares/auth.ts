import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';

//TODO: get proper types
const verifyToken = async (req: any, res: any, next: any) => {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  if (!process.env.TOKEN_KEY) throw new Error('TOKEN_KEY is not set.');

  token = token.replace('Bearer ', '');
  try {
    const decoded: any = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = await UserService.getByEmail(decoded.email);
  } catch (err) {
    return res.status(401).send('Invalid Token.');
  }
  return next();
};
export default verifyToken;
