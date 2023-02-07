import { Context } from 'telegraf';

export const replyToMessage = (
  ctx: Context,
  messageId: number,
  string: string
) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });
