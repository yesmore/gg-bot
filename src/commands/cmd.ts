import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:cmd_command');

const cmd = () => async (ctx: Context) => {
  const message = `*🎯唧唧bot小助手指令手册🎯\n\n`;
  debug(`Triggered "cmd" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { cmd };
