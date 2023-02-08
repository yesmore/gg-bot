import { Context, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { ChatGPTAPI } from 'chatgpt';
import { about, start, list, photo } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { White_List_Rule } from './common/constants';
import { replyToMessage } from './utils';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || '';

const bot = new Telegraf(BOT_TOKEN);
const api = new ChatGPTAPI({ apiKey: OPEN_AI_API_KEY });

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
  chatGpt(ctx, msg);
});

async function chatGpt(ctx: Context, msg: string) {
  try {
    await ctx.reply(`🤔正在组织语言，请稍等...`);
    ctx.sendChatAction('typing');
    const response = await api.sendMessage(msg);
    console.log(
      new Date().toLocaleString(),
      '--AI response to <',
      msg,
      '>:',
      response.text
    );
    await replyToMessage(ctx, ctx.message?.message_id!, response.text);
    // ctx.editMessageText(response.text, {
    //   chat_id: ctx.chat?.id,
    //   message_id: ctx.message?.message_id,
    //   parse_mode: 'Markdown',
    // });
  } catch (err) {
    console.log('Error:', err);
    await ctx.reply('😭出错了，请稍后再试；如果您是管理员，请检查日志。');
    throw err;
  }
}

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
