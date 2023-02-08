import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import bot from './bot';
import './commands';
import './messages';
import './hears';

const ENVIRONMENT = process.env.NODE_ENV || '';

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
