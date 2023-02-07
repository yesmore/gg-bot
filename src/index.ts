import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import { about, start, list } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const randomPhoto = 'https://picsum.photos/200/300/?random';

const bot = new Telegraf(BOT_TOKEN);

bot.command('start', start());
bot.command('about', about());
bot.command('pt', (ctx) => ctx.replyWithPhoto(randomPhoto));
bot.command('list', list());

// bot.on('message', greeting());
bot.on(message('new_chat_members'), greeting());
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('GG boy', (ctx) => ctx.reply('童话里做英雄'));
// bot.hears(/reverse (.+)/, (ctx) =>
//   ctx.reply(`reverse: ${ctx.match[1].split('').reverse().join('')}`)
// );

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
