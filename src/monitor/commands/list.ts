import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../../package.json';

const debug = createDebug('bot:list_command');

const list = () => async (ctx: Context) => {
  const message = `
*ð¯å§å§botå°å©ææä»¤æå*\n
/guess çè¯æ¸¸æ
/pt éæºå¾ç
/list æ¥çæææä»¤
/about å³äºå§å§bot
/help å¦ä½ä½¿ç¨AIèå¤©
`;
  debug(`Triggered "list" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { list };
