const {Composer, Scenes} = require("telegraf");
const api = require('../api/openWeatherMap.js');
const weatherStep = new Composer();
weatherStep.use(async (ctx) => {
  try {
    const weatherData = await api.getWeather();
    await ctx.replyWithHTML(`В Канаде сейчас ${weatherData.weather[0].description}. Температура ${weatherData.main.temp}°C, ощущается как ${weatherData.main.feels_like}. Скорость ветра ${weatherData.wind.speed} м/с`);

    await ctx.scene.leave()
  } catch (e) {
    console.log(e);
  }
})

const weatherScene = new Scenes.WizardScene("weatherWizard", weatherStep);
module.exports = weatherScene;