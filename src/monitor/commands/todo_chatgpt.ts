// import { ChatGPTAPI } from 'chatgpt';
import { Context } from 'telegraf';
// import bot from '../../bot';
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/open_ai_stream';
import { replyToMessage } from '../../utils';
import axios from 'axios';

// const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || '';
// const api = new ChatGPTAPI({ apiKey: OPEN_AI_API_KEY });

export const chatGpt = async (ctx: Context, msg: string) => {
  try {
    // ctx.reply(`🤔正在组织语言...`);
    // ctx.sendChatAction('typing');
    const _msg = `Explain ${msg}${
      msg.slice(-1) === '.' ? '' : '.'
    } to a 6nd grader in Simplified Chinese with a simple example.`;

    const payload: OpenAIStreamPayload = {
      // model: "text-davinci-003",
      // model: 'text-curie-001',
      model: 'text-ada-001',
      prompt: _msg,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: true,
      n: 1,
    };
    const res = await axios.post(
      'https://api.openai.com/v1/completions',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY ?? ''}`,
        },
      }
    );
    console.log('数据1', res, '数据2', res.data);

    let done = false;
    let answer = '';

    while (!done) {
      if (res.status === 200) {
        const { data } = res;
        if (data !== '[DONE]' && data.choices[0]['finish_reason'] !== 'stop') {
          answer = answer + data.choices[0].text;
        } else {
          await ctx.reply(answer).then(() => {
            done = true;
            answer = '';
          });
        }
      }
    }

    // const stream = await OpenAIStream(payload);
    // const reader = stream.getReader();

    // const decoder = new TextDecoder();
    // let done = false;
    // let answer = '';

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   answer = answer + chunkValue;
    // }

    // console.log(
    //   new Date().toLocaleString(),
    //   '--AI response to <',
    //   _msg,
    //   '>:\n',
    //   answer
    // );

    // await ctx.reply(answer).then(() => {});
    // replyToMessage(ctx, ctx.message?.message_id!, res.data);

    // ctx.editMessageText(response.text, {
    //   chat_id: ctx.chat?.id,
    //   message_id: ctx.message?.message_id,
    //   parse_mode: 'Markdown',
    // });
  } catch (err) {
    console.log('Error:', err);
    await ctx.reply('😭出错了，请稍后再试。');
    throw err;
  }
};
