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
mailingClickStep.hears("Отмена", async (ctx) => {
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
    const senderId = ctx.message.from.id.toString();
    for (const data of usersList.rows) {
      await new Promise((res, rej) => {
        if (!data.tgId === senderId) {
          res()
        }
        ctx.telegram.sendMessage(data.tgId, ctx.message.text)
          .then(() => res())
          .catch((e) => {
            if (e.response && e.response.error_code === 403) {
              db.deleteUser(data.tgId).then(() => res());
            }
            rej(e);
          })
      })
    }
    ctx.reply("Рассылка успешно проведена");

    await showMainKeyboard(ctx);
    await ctx.scene.leave()
  } catch (e) {
    console.log(e);
  }
})

const mailingScene = new Scenes.WizardScene("mailingWizard", mailingFirstStep, mailingClickStep, mailingStep);
module.exports = mailingScene;