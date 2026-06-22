import { Router } from 'express';

const router = Router();

router.get('/state', (req, res) => {
  res.json({ message: 'Digital Twin state endpoint stub' });
});

export default router;
