import { InsertUser, User } from '../../db/schema/users';
import * as errors from '../../errors/errorCreator';
import authenticationService from './authentication';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import users from '../users/users';

describe('Authentication service', () => {
  const throwErrorSpy = jest.spyOn(errors, 'throwError');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Register user', () => {
    const newUser: InsertUser = {
      name: 'test',
      email: 'test@mail.com',
      password: 'test',
    };

    it('should throw an error if an user with the same email exists', async () => {
      const existingUser: User = {
        id: 0,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: 'user',
      };

      jest.spyOn(users, 'getUserByEmail').mockResolvedValue(existingUser);

      await expect(async () => {
        await authenticationService.registerUser(newUser);
      }).rejects.toThrow('An user with this email already exists');
      expect(throwErrorSpy).toHaveBeenCalledWith(
        400,
        'An user with this email already exists',
      );
    });
  });

  describe('Login user', () => {
    it('should throw an error if no user with this email', async () => {
      jest
        .spyOn(authenticationService, 'getUserByEmail')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await authenticationService.loginUser('email', 'password');
      }).rejects.toThrow('Invalid credentials');
      expect(throwErrorSpy).toHaveBeenCalledWith(401, 'Invalid credentials');
    });

    it('should throw an error if password doesnt match', async () => {
      jest.spyOn(authenticationService, 'getUserByEmail').mockResolvedValue({
        id: 0,
        name: 'test',
        email: 'test',
        password: 'test',
        role: 'user',
      });

      await expect(async () => {
        await authenticationService.loginUser('email', 'password');
      }).rejects.toThrow('Invalid credentials');
      expect(throwErrorSpy).toHaveBeenCalledWith(401, 'Invalid credentials');
    });
  });
});
