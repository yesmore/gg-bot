import { message } from 'telegraf/filters';
import bot from '../bot';
import { greeting } from './messages';
import { about, list, photo, start } from './commands';
import { White_List_Rule } from '../common/constants';
import { gg_boy, be_yourself } from './commands/white_word';
import './commands/word_game';

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
  // chatGpt(ctx, msg);
});
bot.hears('gg boy', gg_boy);
bot.hears(White_List_Rule, be_yourself);
// bot.hears(/@akajs_bot/, (ctx) => {
//   ctx.reply('你瞅啥？');
// });
