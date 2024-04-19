import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import usersService from './../../services/users/users';
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET as string;

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err || typeof decoded === 'string' || !decoded) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.userRole;
  });

  const user = await usersService.getUserById(req.userId);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token format' });
  }
  next();
};

export default authenticateUser;
