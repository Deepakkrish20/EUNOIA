import { Router } from 'express';

const router = Router();

router.get('/objectives', (req, res) => {
  res.json({ message: 'Vision objectives endpoint stub' });
});

export default router;
