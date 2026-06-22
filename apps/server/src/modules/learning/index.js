import { Router } from 'express';

const router = Router();

router.get('/courses', (req, res) => {
  res.json({ message: 'Learning engine courses endpoint stub' });
});

export default router;
