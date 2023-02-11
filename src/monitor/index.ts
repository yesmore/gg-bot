import { message } from 'telegraf/filters';
import bot from '../bot';
import { greeting } from './messages';
import { about, list, photo, start, help } from './commands';
import { White_List_Rule } from '../common/constants';
import { gg_boy, be_yourself } from './commands/white_word';
import { replyToMessage } from '../utils/index';
import axios from 'axios';

// import { sendAiRequest } from './commands/chatgpt';
import './commands/word_game';

bot.on(message('new_chat_members'), greeting());
bot.command('start', start());
bot.command('about', about());
bot.command(['pt', 'pr', 'prpr'], photo());
bot.command('list', list());
bot.command('help', help());
bot.command('quit', async (ctx) => {
  await ctx.leaveChat();
});

bot.hears(/\/r (.+)/, (ctx) =>
  ctx.reply(`reverse: ${ctx.match[1].split('').reverse().join('')}`)
);
bot.hears(/\/ai (.+)/, async (ctx) => {
  const msg = ctx.match[1];
  // ctx.reply(`🤔正在组织语言...`);
  // ctx.sendChatAction('typing');
  const res = await sendAiRequest(msg);
  await replyToMessage(ctx, ctx.message.message_id, res);
});
bot.hears('gg boy', gg_boy);
bot.hears(White_List_Rule, be_yourself);

const sendAiRequest = async (prompt: string) => {
  const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || '';
  const requestBody = {
    prompt: prompt,
    model: 'text-davinci-003',
    max_tokens: 300,
    top_p: 1,
    temperature: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
      }
    );
    if (response.status === 200) {
      const _msg = response.data.choices[0].text;
      return _msg.startsWith('？')
        ? response.data.choices[0].text.slice(1)
        : _msg;
    }
    return 'Timeout';
  } catch (error) {
    console.error(error);
    return `😭出错了，请稍后再试。\n错误原因：${error}`;
  }
};
