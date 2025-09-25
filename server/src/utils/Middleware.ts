import { Request, Response, NextFunction, Express } from 'express';
import { PrismaClient } from '@prisma/client';
import { MS_Protection, MS_CIS_Protection, MS_Repeats_Protection, MS_Check_Limits, MS_Check_Settings, MS_IP_Blacklist, MS_Wallet_Blacklist, MS_Repeats_TS } from './Utilite';

const prisma = new PrismaClient();
let repeatMemory: { [key: string]: number } = {};

export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip;
  const wallet = req.body.wallet;

  if (MS_Protection) {
    if (MS_IP_Blacklist.includes(ip)) return res.status(403).json({ error: 'IP Blocked' });
    if (wallet && MS_Wallet_Blacklist.includes(wallet.toLowerCase())) return res.status(403).json({ error: 'Wallet Blocked' });

    if (MS_CIS_Protection) { /* Skip for now */ }

    if (MS_Repeats_Protection) {
      const key = `${ip}_${req.body.data || 'unknown'}`;
      if (repeatMemory[key] && Date.now() - repeatMemory[key] < MS_Repeats_TS * 1000) {
        return res.status(429).json({ error: 'Rate Limited' });
      }
      repeatMemory[key] = Date.now();
    }

    if (MS_Check_Limits) {
      const count = await prisma.user.count({ where: { ip } });
      if (count > MS_Check_Settings.limit_personal) return res.status(429).json({ error: 'Limit Exceeded' });
    }
  }

  next();
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${process.env.API_TOKEN || 'default'}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

export function setupMiddleware(app: Express, prismaClient: PrismaClient) {
  app.use(validateRequest);
}