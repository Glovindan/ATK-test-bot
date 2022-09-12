const {Markup} = require("telegraf");
const showMainKeyboard = async (ctx) => {
  await ctx.reply ("Здравствуйте. Нажмите на любую интересующую Вас кнопку",
    Markup.keyboard([
      ["Погода в Канаде"],
      ["Хочу почитать!"],
      ["Сделать рассылку"]
    ]).oneTime().resize())
}

const showMailingKeyboard = async (ctx) => {
  await ctx.reply ("Вы выбрали рассылку всем пользователям. Вы уверены что хотите это сделать?",
    Markup.keyboard([
      ["Уверен"],
      ["Отмена"]
    ]).oneTime().resize())
}

module.exports = {showMainKeyboard, showMailingKeyboard};