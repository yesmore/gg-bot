import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../../package.json';

const debug = createDebug('bot:list_command');

const list = () => async (ctx: Context) => {
  const message = `
*🎯唧唧bot小助手指令手册🎯*\n
/ai ChatGPT
/guess 猜词游戏
/pt 随机图片
/list 查看所有指令
/about 关于唧唧bot
`;
  debug(`Triggered "list" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { list };
