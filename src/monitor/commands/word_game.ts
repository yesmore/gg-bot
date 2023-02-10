import bot from '../../bot';
import { replyToMessage } from '../../utils';

const wordList = ['苹果', '香蕉', '西瓜'];
const regex = new RegExp(`^@${bot.botInfo?.username} (.+)`);
const scores = new Map();

bot.command('guess', (ctx) => {
  ctx.reply(
    `🎯猜词游戏规则说明🎯\n\n⭐️格式: /g xxx\n⭐️积分：猜对加1，错误不变，发送 /score 查看个人积分\n⭐️提示：三种水果`
  );
});

bot.command('score', (ctx) => {
  let score = scores.get(ctx.from.id) || 0;
  replyToMessage(ctx, ctx.message?.message_id, `当前积分: ${score}`);
});

bot.hears(/\/g (.+)/, (ctx) => {
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
      `🎉正确！答案是 ${word}.\n你的积分: ${score}`
    );
  } else {
    replyToMessage(
      ctx,
      ctx.message?.message_id,
      `错误，答案是 ${word}.\n你的积分: ${score}`
    );
  }
  scores.set(ctx.from.id, score);
});
