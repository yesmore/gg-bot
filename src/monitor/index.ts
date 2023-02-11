import { message } from 'telegraf/filters';
import bot from '../bot';
import { greeting } from './messages';
import { about, list, photo, start } from './commands';
import { White_List_Rule } from '../common/constants';
import { gg_boy, be_yourself } from './commands/white_word';
import axios from 'axios';
import './commands/word_game';
import { replyToMessage } from '../utils/index';

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || '';

bot.on(message('new_chat_members'), greeting());
bot.command('start', start());
bot.command('about', about());
bot.command(['pt', 'pr', 'prpr'], photo());
bot.command('list', list());
bot.command('quit', async (ctx) => {
  await ctx.leaveChat();
});

bot.hears(/\/r (.+)/, (ctx) =>
  ctx.reply(`reverse: ${ctx.match[1].split('').reverse().join('')}`)
);
bot.hears(/\/ai (.+)/, (ctx) => {
  const msg = ctx.match[1];
  const requestBody = {
    prompt: msg,
    model: 'text-davinci-003',
    max_tokens: 100,
  };
  // ctx.reply(`🤔正在组织语言...`);
  // ctx.sendChatAction('typing');
  axios
    .post('https://api.openai.com/v1/completions', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      },
    })
    .then((res) => {
      console.log('请求：', res.status, res.data);
      if (res.status === 200) {
        replyToMessage(ctx, ctx.message.message_id, res.data.choices[0].text);
      }
    })
    .catch((e) => {
      console.log(e);
      replyToMessage(
        ctx,
        ctx.message.message_id,
        `😭出错了，请稍后再试。\n错误原因：${e}`
      );
    });
});
bot.hears('gg boy', gg_boy);
bot.hears(White_List_Rule, be_yourself);
// bot.hears(/@akajs_bot/, (ctx) => {
//   ctx.reply('你瞅啥？');
// });
