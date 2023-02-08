import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:start_command');

const start = () => async (ctx: Context) => {
  const message = `*🎉欢迎使用唧唧bot小助手🎉*\n\n/list 查看所有指令\n/about 关于唧唧bot\n\ntip: 一些词汇可能触发唧唧bot，快来探索吧~`;
  debug(`Triggered "start" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { start };
