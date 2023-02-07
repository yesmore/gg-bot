import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import { about, start } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('start', start());
bot.command('about', about());
// bot.on('message', greeting());
bot.on(message('new_chat_members'), greeting());
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('GG boy', (ctx) => ctx.reply('Hey there'));

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
