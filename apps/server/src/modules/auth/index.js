import { Router } from 'express';

const router = Router();

router.get('/session', (req, res) => {
  res.json({ message: 'Auth session endpoint stub' });
});

export default router;
