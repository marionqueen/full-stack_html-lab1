import { Router } from 'express';
import * as leaderController from '../controllers/leaderController';

const router = Router();

router.get('/', leaderController.getLeaders);
router.post('/', leaderController.createLeader);

export default router;