import bot from '../bot';
import { message } from 'telegraf/filters';
import { greeting } from './greeting';

bot.on(message('new_chat_members'), greeting());
