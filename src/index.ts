import { session, Scenes, Telegraf, Context } from 'telegraf';
import { BotContext } from './BotContext';

import { about, countMessage } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';


const bot = new Telegraf<BotContext>(BOT_TOKEN);

// Set command suggestions
bot.telegram.setMyCommands([
  {
    command: 'about',
    description: 'About command',
  },
  {
    command: 'count',
    description: 'Count command',
  }
]);

bot.use(session());

bot.command('count', countMessage());
bot.command('about', about());
bot.on('message', greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);

console.log(BOT_TOKEN);