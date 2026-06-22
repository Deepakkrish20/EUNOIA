import { Router } from 'express';

const router = Router();

router.get('/list', (req, res) => {
  res.json({ message: 'Tasks list endpoint stub' });
});

export default router;
