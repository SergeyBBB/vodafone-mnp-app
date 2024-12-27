# Vodafone MNP App

![Vodafone Logo](/public/vodafone-logo.png)

## Про проект

Vodafone MNP App - це сучасний веб-додаток для переносу мобільного номера до мережі Vodafone Ukraine. Додаток розроблено з використанням передових технологій та з урахуванням найкращих практик UX/UI дизайну.

### Основні можливості

- **Простий процес переносу номера** - 5 простих кроків для переходу до Vodafone
- **Підтримка eSIM** - можливість отримати цифрову SIM-карту
- **Фізична SIM-карта** - доставка карти Новою Поштою
- **Гнучкий вибір тарифів** - три тарифні плани для різних потреб
- **Зручний інтерфейс** - інтуїтивно зрозумілий дизайн

## Технології

- React
- TypeScript
- Tailwind CSS
- Material-UI (MUI)
- Vite

## Кроки переносу номера

1. **Введення номера телефону**
   - Перевірка доступності номера для переносу
   - Верифікація через SMS або дзвінок

2. **Вибір тарифного плану**
   - Безліміт
   - SuperNet Start
   - Базовий тариф
   - Детальний опис переваг кожного тарифу

3. **Вибір типу SIM-карти**
   - eSIM з миттєвою активацією
   - Фізична SIM-карта з доставкою
   - Список підтримуваних пристроїв для eSIM

4. **Оформлення доставки** (для фізичної SIM)
   - Інтеграція з Новою Поштою
   - Вибір відділення
   - Введення даних отримувача

5. **Підтвердження та статус**
   - Відстеження статусу переносу
   - Інструкції з активації
   - Інформація про доставку

## Запуск проекту

```bash
# Встановлення залежностей
npm install

# Запуск в режимі розробки
npm run dev

# Збірка для продакшену
npm run build
```

## Підтримувані пристрої для eSIM

### iPhone
- iPhone XS/XS Max/XR
- iPhone 11/11 Pro/11 Pro Max
- iPhone 12/12 Mini/12 Pro/12 Pro Max
- iPhone 13/13 Mini/13 Pro/13 Pro Max
- iPhone 14/14 Plus/14 Pro/14 Pro Max
- iPhone 15/15 Plus/15 Pro/15 Pro Max

### Samsung
- Galaxy S20/S20+/S20 Ultra
- Galaxy S21/S21+/S21 Ultra
- Galaxy S22/S22+/S22 Ultra
- Galaxy S23/S23+/S23 Ultra
- Galaxy Z Fold 2/3/4
- Galaxy Z Flip 3/4

### Google Pixel
- Pixel 3/3 XL/3a/3a XL
- Pixel 4/4 XL/4a
- Pixel 5/5a
- Pixel 6/6 Pro/6a
- Pixel 7/7 Pro/7a
- Pixel 8/8 Pro

## Внесок у проект

Ми відкриті до пропозицій щодо покращення проекту. Якщо у вас є ідеї або ви знайшли помилку:

1. Створіть Issue
2. Запропонуйте Pull Request
3. Опишіть ваші зміни
4. Дочекайтеся review

## Ліцензія

Цей проект розповсюджується під ліцензією MIT. Дивіться файл [LICENSE](LICENSE) для отримання додаткової інформації.

## Контакти

Якщо у вас виникли питання або пропозиції, звертайтеся:
- [Vodafone Ukraine](https://www.vodafone.ua)
- [Підтримка](https://www.vodafone.ua/support)

---

&copy; 2024 Vodafone Ukraine. Всі права захищені.

## Telegram Mini App

This is a Telegram Mini App for transferring mobile numbers to Vodafone Ukraine network.

### Features

- Phone number validation
- Tariff plan selection
- eSIM support with device compatibility check
- Integration with Telegram Mini Apps
- Real-time status updates

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the Telegram bot (in a separate terminal):
```bash
cd bot
npm install
npm start
```

### Deployment

The application is configured for deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your changes

### Bot Commands

- `/start` - Start the number transfer process
- More commands coming soon...

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_URL=your-vercel-url
```

Create a `.env` file in the bot directory:

```env
TELEGRAM_BOT_TOKEN=your-bot-token
```

### Tech Stack

- React + Vite
- TypeScript
- Material-UI
- Node.js + Express (for bot)
- Telegram Bot API
