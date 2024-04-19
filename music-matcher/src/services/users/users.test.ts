import * as errors from '../../errors/errorCreator';
import usersService from './users';
import { describe, expect, it, jest } from '@jest/globals';

describe('Update user', () => {
  it('should throw error for empty newData', async () => {
    const throwErrorSpy = jest.spyOn(errors, 'throwError');
    await expect(async () => {
      await usersService.updateUser(0, {});
    }).rejects.toThrow('Invalid fields');
    expect(throwErrorSpy).toHaveBeenCalledWith(400, 'Invalid fields');
  });
});
