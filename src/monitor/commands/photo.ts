import { Context } from 'telegraf';
import * as _ from 'lodash';

const photo = () => async (ctx: Context) => {
  const item = _.random(1, 100);
  const pt_path = `https://img-yesmore.vercel.app/v2/${_.random(1, 14)}/${
    item < 10 ? '0' + item : item
  }.jpg`;
  await ctx.replyWithPhoto(pt_path);
};

export { photo };
