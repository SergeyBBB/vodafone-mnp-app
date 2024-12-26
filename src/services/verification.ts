import axios from 'axios';

const TELEGRAM_GATEWAY_TOKEN = 'AAFvAwAAixU2ds-OhkjFNPrDT0WSbjZMMvjgMXxOojFA7Q';

interface VerificationResponse {
  success: boolean;
  message: string;
  verificationId?: string;
}

export async function verifyPhoneNumber(
  phoneNumber: string,
  method: 'telegram' | 'bankid' | 'dia'
): Promise<VerificationResponse> {
  try {
    // Basic phone number validation
    if (!phoneNumber.match(/^\+?380\d{9}$/)) {
      return {
        success: false,
        message: 'Невірний формат номера телефону. Приклад: +380501234567',
      };
    }

    switch (method) {
      case 'telegram':
        return await verifyTelegram(phoneNumber);
      case 'bankid':
      case 'dia':
        // Для BankID и Дія просто переходим дальше
        return {
          success: true,
          message: 'Верифікацію пройдено',
        };
      default:
        throw new Error('Невірний метод верифікації');
    }
  } catch (error) {
    console.error('Помилка верифікації:', error);
    return {
      success: false,
      message: 'Помилка верифікації. Спробуйте ще раз.',
    };
  }
}

async function verifyTelegram(phoneNumber: string): Promise<VerificationResponse> {
  try {
    const response = await axios.post(
      'https://api.telegram.org/client/v2/auth/request_verification_code',
      {
        phone_number: phoneNumber,
        settings: {
          type: 'app',
          token: TELEGRAM_GATEWAY_TOKEN
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: 'Код верифікації відправлено в Telegram',
        verificationId: response.data.verification_id
      };
    }

    throw new Error('Помилка відправки коду верифікації');
  } catch (error) {
    console.error('Telegram Gateway error:', error);
    return {
      success: false,
      message: 'Помилка верифікації через Telegram. Спробуйте інший спосіб.',
    };
  }
}
