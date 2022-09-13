const {Telegraf, Markup, session, Scenes} = require('telegraf')
require('dotenv').config();
const db = require('./db')

const weatherScene = require('./scenes/weather.js');
const mailingScene = require('./scenes/mailing.js');
const bookScene = require('./scenes/book.js');

const {showMainKeyboard} = require("./keyboards");

const bot = new Telegraf(process.env.TGTOKEN)
const stage = new Scenes.Stage([weatherScene, mailingScene, bookScene])

bot.use(session())
bot.use(stage.middleware())

bot.hears("Погода в Канаде", ctx => ctx.scene.enter("weatherWizard"))
bot.hears("Хочу почитать!", ctx => ctx.scene.enter("bookWizard"))
bot.hears("Сделать рассылку", ctx => ctx.scene.enter("mailingWizard"))

bot.start(async (ctx) => {
  try {
    await db.createUser(ctx.message.from.id);
    await showMainKeyboard(ctx);
  } catch (e) {
    console.log(e)
  }
})

bot.launch().then(() => {
  console.log("Bot started successfully");
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))