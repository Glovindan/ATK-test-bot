const {Composer, Scenes} = require("telegraf");
const {URL, CAPTION, BOOK_PATH} = require("./bookData");

const bookStep = new Composer();
bookStep.use(async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      {url: URL},
      {caption: CAPTION}
    );

    const fs = require('fs').promises;
    const path = BOOK_PATH;
    const data = await fs.readFile(path);
    await ctx.sendDocument({
      source: data,
      filename: 'karmaniy_spravochnik_po_piton.zip'
    })
    await ctx.scene.leave();

  } catch (e) {
    console.log(e);
  }
})

const bookScene = new Scenes.WizardScene("bookWizard", bookStep);
module.exports = bookScene;