import bot from '../../bot';
import { replyToMessage } from '../../utils';

const isStart = false;
const wordList = ['apple', 'banana', 'cherry'];
const regex = new RegExp(`^@${bot.botInfo?.username} (.+)`);
const scores = new Map();

console.log(bot.botInfo);
bot.command('guess', (ctx) => {
  ctx.reply(`欢迎来到猜词游戏!\n\n猜词格式：@${bot.botInfo?.username} xxx`);
});

bot.hears(regex, (ctx) => {
  // if (!ctx.message.text.startsWith('@' + bot.botInfo?.username)) {
  //   return;
  // }

  if (isStart) {
    let score = scores.get(ctx.from.id) || 0;
    const guess = ctx.match[1].toLowerCase();
    console.log(guess);
    const word = wordList[Math.floor(Math.random() * wordList.length)];

    if (guess === word) {
      score += 1;
      replyToMessage(
        ctx,
        ctx.message?.message_id,
        `🎉正确! 答案是 ${word}. 你的当前积分为 ${score}.`
      );
    } else {
      replyToMessage(
        ctx,
        ctx.message?.message_id,
        `错误. 答案是 ${word}. 你的当前积分为 ${score}.`
      );
    }
    scores.set(ctx.from.id, score);
  } else {
    ctx.reply(`请发送 /guess 开始猜词游戏~`);
  }
});
