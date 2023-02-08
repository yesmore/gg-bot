import { Telegraf } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const bot = new Telegraf(BOT_TOKEN);

export default bot;
