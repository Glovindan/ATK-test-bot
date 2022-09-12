const { Telegraf, Markup, session, Scenes } = require('telegraf')
require('dotenv').config();
const db = require('./db')

const bot = new Telegraf(process.env.TGTOKEN)

bot.use(session())
// const stage = new Scenes.Stage([informScene, breedsList, favouriteScene, alphabetScene, searchScene])
// bot.use(stage.middleware())

// bot.hears("Погода в Канаде", ctx => ctx.scene.enter("weatherWizard"))
// bot.hears("Хочу почитать!", ctx => ctx.scene.enter("bookWizard",))
// bot.hears("Сделать рассылку", ctx => ctx.scene.enter("mailingWizard"))

bot.start(async (ctx) => {
  try {
    // await db.createUser(ctx.message.from.id);
    await ctx.reply ("Здравствуйте. Нажмите на любую интересующую Вас кнопку",
      Markup.keyboard([
        ["Погода в Канаде"],
        ["Хочу почитать!"],
        ["Сделать рассылку"]
      ]).oneTime().resize())
  } catch(e) {
    console.log(e)
  }
})

bot.launch().then(() => {
  console.log("Bot started successfully");
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))