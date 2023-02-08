import { Context, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import { about, start, list, photo } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { White_List_Rule } from './common/constants';
import { replyToMessage } from './utils';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('start', start());
bot.command('about', about());
bot.command('pt', photo());
bot.command('list', list());

bot.on(message('new_chat_members'), greeting());

bot.hears('GG boy', (ctx) => ctx.reply('童话里做英雄'));
bot.hears(White_List_Rule, (ctx) =>
  replyToMessage(ctx, ctx.message?.message_id, `反弹buibuibui~`)
);
bot.hears(/r (.+)/, (ctx) =>
  ctx.reply(`reverse: ${ctx.match[1].split('').reverse().join('')}`)
);
bot.hears(/gpt (.+)/, (ctx) => {
  const msg = ctx.match[1];
  ctx.reply('接入中...');
  // chatGpt(ctx, bot, msg);
});

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
