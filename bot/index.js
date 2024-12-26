require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.VITE_APP_URL;

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

// Обработка команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  
  await bot.sendMessage(chatId, 'Вітаємо! Оберіть опцію:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Перенести номер', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

// Запуск Express сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
