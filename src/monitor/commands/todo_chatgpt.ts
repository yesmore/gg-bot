// import { ChatGPTAPI } from 'chatgpt';
import { Context } from 'telegraf';
import bot from '../../bot';

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || '';

export const chatGpt = async (ctx: Context, msg: string) => {
  try {
    const { ChatGPTAPI } = await import('chatgpt');
    const api = new ChatGPTAPI({ apiKey: OPEN_AI_API_KEY });
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
    // await replyToMessage(ctx, ctx.message?.message_id!, response.text);
    await bot.telegram.editMessageText(
      ctx.chat?.id,
      ctx.message?.message_id,
      undefined,
      response.text,
      { parse_mode: 'Markdown' }
    );
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
};
