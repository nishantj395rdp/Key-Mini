import { Router } from 'express';
import { getUserAssets, repeatWithdraw, checkAllowance } from '../module/user.services';
import { validateUser } from '../utils/Middleware';

const router = Router();

router.get('/:wallet/assets', validateUser, async (req, res) => {
  const { wallet } = req.params;
  const assets = await getUserAssets(wallet, 1);
  res.json(assets);
});

router.post('/repeat/:id', validateUser, async (req, res) => {
  const { id } = req.params;
  const result = await repeatWithdraw(id, req.ip);
  res.json(result);
});

router.get('/allowance/:wallet/:token', validateUser, async (req, res) => {
  const { wallet, token } = req.params;
  const allowance = await checkAllowance(wallet, token, 1);
  res.json(allowance);
});

export default router;