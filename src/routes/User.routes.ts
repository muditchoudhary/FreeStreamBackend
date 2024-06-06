import express, { Router } from 'express';

import UserController from '../controllers/User.controller';

const router: Router = express.Router();

const { getUserByExternalId, getRecommendedUsers } = UserController();

router.get('/recommended', getRecommendedUsers);

router.get('/:userId', getUserByExternalId);

export default router;
