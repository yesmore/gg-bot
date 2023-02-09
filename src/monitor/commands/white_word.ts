import { Context } from 'telegraf';
import { replyToMessage } from '../../utils';

export const gg_boy = (ctx: Context) => ctx.reply('童话里做英雄');

export const be_yourself = (ctx: Context) =>
  replyToMessage(ctx, ctx.message?.message_id!, `反弹buibuibui~`);
