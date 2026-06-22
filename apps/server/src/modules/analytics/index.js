import { Router } from 'express';

const router = Router();

router.get('/reports', (req, res) => {
  res.json({ message: 'Analytics engine reports endpoint stub' });
});

export default router;
