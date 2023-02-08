import bot from '../bot';
import { White_List_Rule } from '../common/constants';
import { replyToMessage } from '../utils';

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
