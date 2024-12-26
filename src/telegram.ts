declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        close: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
      };
    };
  }
}

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    // Сообщаем телеграму, что приложение готово
    window.Telegram.WebApp.ready();

    // Скрываем кнопку назад при старте
    window.Telegram.WebApp.BackButton.hide();
  }
};

export const showBackButton = (callback: () => void) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(callback);
  }
};

export const hideBackButton = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.BackButton.hide();
  }
};

export const showMainButton = (text: string, callback: () => void) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.MainButton.text = text;
    window.Telegram.WebApp.MainButton.onClick(callback);
    window.Telegram.WebApp.MainButton.show();
  }
};

export const hideMainButton = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.MainButton.hide();
  }
};

export const closeTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};
