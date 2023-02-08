import bot from '../../bot';

const wordList = ['apple', 'banana', 'cherry'];
const regex = new RegExp(`^@${bot.botInfo?.username} (.+)`);
const scores = new Map();

bot.command('guess', (ctx) => {
  ctx.reply('Welcome to the Word Game! Start by guessing a word.');
});

bot.hears(/@akajs_bot (.+)/, (ctx) => {
  // if (!ctx.message.text.startsWith('@' + bot.botInfo?.username)) {
  //   return;
  // }
  console.log(bot.botInfo);

  let score = scores.get(ctx.from.id) || 0;
  const guess = ctx.match[1].toLowerCase();
  const word = wordList[Math.floor(Math.random() * wordList.length)];

  if (guess === word) {
    score += 1;
    ctx.reply(`🎉Correct! The word was ${word}. Your score is now ${score}.`);
  } else {
    ctx.reply(`Incorrect. The word was ${word}. Your score is ${score}.`);
  }
  scores.set(ctx.from.id, score);
});
