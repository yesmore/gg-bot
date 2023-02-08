import bot from '../../bot';
import { replyToMessage } from '../../utils';

const wordList = ['apple', 'banana', 'cherry'];
const regex = new RegExp(`^@${bot.botInfo?.username} (.+)`);
const scores = new Map();

bot.command('guess', (ctx) => {
  ctx.reply(
    `欢迎来到猜词游戏!\n\n规则：\n格式：@${bot.botInfo?.username} xxx\n积分：猜对加1，错误不变`
  );
});

bot.command('score', (ctx) => {
  let score = scores.get(ctx.from.id) || 0;
  replyToMessage(ctx, ctx.message?.message_id, `当前积分: ${score}.`);
});

bot.hears(/@akajs_bot (.+)/, (ctx) => {
  // if (!ctx.message.text.startsWith('@' + bot.botInfo?.username)) {
  //   return;
  // }

  const guess = ctx.match[1].toLowerCase();
  let score = scores.get(ctx.from.id) || 0;
  const word = wordList[Math.floor(Math.random() * wordList.length)];

  if (guess === word) {
    score += 1;
    replyToMessage(
      ctx,
      ctx.message?.message_id,
      `🎉正确！答案是 ${word}.\n你的积分: ${score}.`
    );
  } else {
    replyToMessage(
      ctx,
      ctx.message?.message_id,
      `错误，答案是 ${word}.\n你的积分: ${score}.`
    );
  }
  scores.set(ctx.from.id, score);
});
