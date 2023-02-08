import { Context } from 'telegraf';
import bot from '../../bot';
import { message } from 'telegraf/filters';

export const word_game = () => async (ctx: Context) => {};

const wordList = ['apple', 'banana', 'cherry'];
const regex = new RegExp(`^@${bot.botInfo?.username}`);
const scores = new Map();

bot.hears('/word', (ctx) => {
  ctx.reply('Welcome to the Word Game! Start by guessing a word.');
});

bot.hears(regex, (ctx) => {
  // if (!ctx.message.text.startsWith('@' + bot.botInfo?.username)) {
  //   return;
  // }

  let score = scores.get(ctx.from.id) || 0;
  const guess = ctx.message.text.toLowerCase();
  const word = wordList[Math.floor(Math.random() * wordList.length)];

  if (guess === word) {
    score += 1;
    ctx.reply(`Correct! The word was ${word}. Your score is now ${score}.`);
  } else {
    ctx.reply(`Incorrect. The word was ${word}. Your score is ${score}.`);
  }
  scores.set(ctx.from.id, score);
});
