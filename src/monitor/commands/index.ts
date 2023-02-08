import bot from '../../bot';
import { about } from './about';
import { start } from './start';
import { list } from './list';
import { photo } from './photo';

bot.command('start', start());
bot.command('about', about());
bot.command('pt', photo());
bot.command('list', list());
