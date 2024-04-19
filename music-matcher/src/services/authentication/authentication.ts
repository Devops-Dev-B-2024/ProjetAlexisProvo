import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { InsertUser, users } from '../../db/schema/users';
import bcrypt from 'bcrypt';
import { throwError } from '../../errors/errorCreator';
import usersService from '../users/users';
import thisModule from './authentication';

const registerUser = async (newUser: InsertUser) => {
  const existingUser = await usersService.getUserByEmail(newUser.email);
  if (existingUser) {
    throwError(400, 'An user with this email already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  const newUserWithId = await db
    .insert(users)
    .values({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
    })
    .returning({ id: users.id, name: users.name, email: users.email });

  return newUserWithId[0];
};

const getUserByEmail = async (email: string) => {
  const result = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return result;
};

const loginUser = async (email: string, password: string) => {
  const user = await thisModule.getUserByEmail(email);

  if (!user) {
    throwError(401, 'Invalid credentials');
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } else {
      throwError(401, 'Invalid credentials');
    }
  }
};

export default {
  registerUser,
  loginUser,
  getUserByEmail,
};
