import express from 'express';
import versionController from '../../controllers/version/version';

export const router = express.Router();

router.get('/', versionController.getVersion);
