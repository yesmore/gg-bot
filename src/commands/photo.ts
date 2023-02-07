import { Context } from 'telegraf';

const photo = () => async (ctx: Context) => {
  const randomPhoto = 'https://picsum.photos/200/300/?random';
  await ctx.replyWithPhoto(randomPhoto);
};

export { photo };
