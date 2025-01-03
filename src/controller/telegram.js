const token = process.env.TELEGRAM_BOT_TOKEN;

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(token, { polling: true });

const sendMessage = async (chatId, text, url) => {
  try {
    const inlineKeyboard = [
      [
        {
          text: "Link",
          url: url
        },
      ]
      
    ];
const log = await bot.sendMessage(chatId, text.toString(), {
  reply_markup: {
    inline_keyboard: inlineKeyboard,
  },
  parse_mode: "HTML",
});
  } catch (error) {
    console.error("Errore nell'invio del messaggio:", error);
  }
};

module.exports = {
  sendMessage,
};