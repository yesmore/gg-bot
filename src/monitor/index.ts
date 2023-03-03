import { message } from 'telegraf/filters';
import bot from '../bot';
import { greeting } from './messages';
import { about, list, photo, start, help } from './commands';
import { White_List_Rule } from '../common/constants';
import { gg_boy, be_yourself } from './commands/white_word';
import { replyToMessage } from '../utils/index';
import { sendAiRequest } from './commands/chatgpt';

import './commands/word_game';

bot.on(message('new_chat_members'), greeting());
bot.command('start', start());
bot.command('about', about());
bot.command(['pt', 'pr', 'prpr'], photo());
bot.command('list', list());
bot.command('help', help());

bot.hears(/\/r (.+)/, (ctx) =>
  ctx.reply(`reverse: ${ctx.match[1].split('').reverse().join('')}`)
);
bot.hears(/\/ai (.+)/, async (ctx) => {
  const msg = ctx.match[1];
  ctx.reply(`🤔正在组织语言...`);
  ctx.sendChatAction('typing');
  const res = await sendAiRequest(msg);
  await replyToMessage(ctx, ctx.message.message_id, res);
});
bot.hears('gg boy', gg_boy);
bot.hears(White_List_Rule, be_yourself);
