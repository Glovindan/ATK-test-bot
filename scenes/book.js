const {Composer, Scenes} = require("telegraf");
const bookData = require("./book.json");

const bookStep = new Composer();
bookStep.use(async (ctx) => {
  try {
    const bookData = require('./book.json');

    await ctx.replyWithPhoto(
      {url:bookData.url},
      {caption:bookData.caption}
    );

    const fs = require('fs');
    const path = './public/karmaniy_spravochnik_po_piton.zip';
    fs.readFile(path,async (err,data) => {
      await ctx.sendDocument({source: data, filename: 'karmaniy_spravochnik_po_piton.zip'})
      await ctx.scene.leave()
    })
  } catch (e) {
    console.log(e);
  }
})

const bookScene = new Scenes.WizardScene("bookWizard", bookStep);
module.exports = bookScene;