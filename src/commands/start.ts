import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: Context) => {
  const message = `*🎉欢迎使用唧唧bot小助手🎉*\n\n/cmd 查看所有指令\n/help 查看帮助\n/about 关于唧唧bot`;
  debug(`Triggered "start" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { start };
