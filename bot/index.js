const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

// Telegram bot token
const token = '5582652373:AAGxMDwaTA_5aRwZMF_uzrX_vEadesuYCOg';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Web app URL (deployed on Vercel)
const webAppUrl = 'https://vodafone-mnp-app.vercel.app';

// Command handler for /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  
  await bot.sendMessage(chatId, 'Вітаємо! Оберіть опцію нижче:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Перенести номер до Vodafone', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

// Handle web app data
bot.on('web_app_data', async (msg) => {
  const chatId = msg.chat.id;
  const data = msg.web_app_data.data;
  
  try {
    const formData = JSON.parse(data);
    await bot.sendMessage(chatId, `Дякуємо! Ваша заявка прийнята:\n${JSON.stringify(formData, null, 2)}`);
  } catch (error) {
    console.error('Error processing web app data:', error);
    await bot.sendMessage(chatId, 'Вибачте, сталася помилка при обробці даних.');
  }
});

// Express endpoints
app.post('/webhook', async (req, res) => {
  try {
    const { chatId, data } = req.body;
    await bot.sendMessage(chatId, `Отримано нову заявку:\n${JSON.stringify(data, null, 2)}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot server is running on port ${PORT}`);
});
