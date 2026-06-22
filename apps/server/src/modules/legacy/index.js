import { Router } from 'express';

const router = Router();

router.get('/data', (req, res) => {
  res.json({ message: 'Legacy system connection endpoint stub' });
});

export default router;
