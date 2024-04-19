import express from 'express';
import authenticationController from '../../controllers/authentication/authentication';

export const router = express.Router();

router.post('/register', authenticationController.registerUser);
router.post('/login', authenticationController.loginUser);
