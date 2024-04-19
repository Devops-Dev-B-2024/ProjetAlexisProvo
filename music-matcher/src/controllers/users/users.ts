import { Request, Response, NextFunction } from 'express';
import usersService from './../../services/users/users';
import { throwError } from '../../errors/errorCreator';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userRole !== 'admin') {
      throwError(403, 'Access forbidden');
    }

    const users = await usersService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userRole !== 'admin' && parseInt(req.params.id) !== req.userId) {
      throwError(403, 'Access forbidden');
    }

    const user = await usersService.getUserById(parseInt(req.params.id));

    if (!user) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userRole !== 'admin' && parseInt(req.params.id) !== req.userId) {
      throwError(403, 'Access forbidden');
    }

    if (req.body?.role && req.userRole !== 'admin') {
      throwError(403, 'You are not allowed to modify role');
    }

    const updatedUser = await usersService.updateUser(
      parseInt(req.params.id),
      req.body,
    );

    if (!updatedUser) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userRole !== 'admin' && parseInt(req.params.id) !== req.userId) {
      throwError(403, 'Access forbidden');
    }

    const deletedUser = await usersService.deleteUser(parseInt(req.params.id));

    if (!deletedUser) {
      throwError(404, "Ressource doesn't exists");
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
