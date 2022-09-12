const {Composer, Scenes, Markup} = require("telegraf");
const db = require('../db.js')
const {showMainKeyboard, showMailingKeyboard} = require("../keyboards");

const mailingFirstStep = new Composer();
mailingFirstStep.use(async (ctx) => {
  try {
    await showMailingKeyboard(ctx);

    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
})

const mailingClickStep = new Composer()
mailingClickStep.hears("Уверен", async (ctx) => {
  try {
    await ctx.replyWithHTML("Введите сообщение, которое хотите отправить всем пользователям.");

    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
})
mailingClickStep.hears("Отмена", async(ctx) => {
  try {
    await showMainKeyboard(ctx);
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
})

const mailingStep = new Composer();
mailingStep.on("text", async (ctx) => {
  try {
    const usersList = await db.getUsersList();
    usersList.rows.forEach(data => {
      ctx.telegram.sendMessage(data.tgId, ctx.message.text);
    })

    await ctx.scene.leave()
  } catch (e) {
    console.log(e);
  }
})

const mailingScene = new Scenes.WizardScene("mailingWizard", mailingFirstStep, mailingClickStep, mailingStep);
module.exports = mailingScene;