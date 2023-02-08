import * as cron from 'node-cron';
import { bot } from '../index';

const CHAT_ID = process.env.CHAT_ID || '';

let count = 0;

cron.schedule('*/10 * * * * *', () => {
  count++;
  const now = new Date();
  bot.telegram.sendMessage(
    CHAT_ID,
    `Current time is ${now}. This is message number ${count}.`
  );
});
