import { UpdateUser, users } from './../../db/schema/users';
import { likedArtists } from './../../db/schema/likedArtists';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { throwError } from '../../errors/errorCreator';

const getAllUsers = async () => {
  const result = await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return result;
};

const getUserById = async (userId: number) => {
  const result = await db.query.users.findFirst({
    columns: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    where: eq(users.id, userId),
  });

  return result;
};

const updateUser = async (userId: number, newData: UpdateUser) => {
  if (Object.keys(newData).length === 0) {
    throwError(400, 'Invalid fields');
  }
  const result = await db
    .update(users)
    .set(newData)
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    });

  return result[0];
};

const deleteUser = async (userId: number) => {
  await db.delete(likedArtists).where(eq(likedArtists.idUser, userId));
  const result = await db.delete(users).where(eq(users.id, userId)).returning({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
  });
  return result[0];
};

const getUserByEmail = async (email: string) => {
  const result = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return result;
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
};
