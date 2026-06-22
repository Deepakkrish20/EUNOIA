import { Router } from 'express';

const router = Router();

router.get('/metrics', (req, res) => {
  res.json({ message: 'Dashboard metrics endpoint stub' });
});

export default router;
