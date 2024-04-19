import express from 'express';
import usersController from '../../controllers/users/users';
import authenticationMiddleware from '../../middlewares/authentication/authenticationMiddleware';

export const router = express.Router();

router.get('/', authenticationMiddleware, usersController.getAllUsers);
router.get('/:id', authenticationMiddleware, usersController.getUserById);
router.patch('/:id', authenticationMiddleware, usersController.updateUser);
router.delete('/:id', authenticationMiddleware, usersController.deleteUser);
