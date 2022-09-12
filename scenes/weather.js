const {Composer, Scenes} = require("telegraf");

const weatherStep = new Composer();
weatherStep.use(async (ctx) => {
  try {
    //GET WEATHER FROM API
    await ctx.replyWithHTML("Ну такая вот погода Канаде короче");
    // return ctx.wizard.next();
    await ctx.scene.leave()
  } catch (e) {
    console.log(e);
  }
})

const weatherScene = new Scenes.WizardScene("weatherWizard", weatherStep);
module.exports = weatherScene;