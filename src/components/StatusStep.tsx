import React from 'react';

interface StatusStepProps {
  number: string;
  verificationMethod: string;
  tariff: string;
  sim: {
    type: string;
    isESim: boolean;
  };
  delivery: {
    method: string;
    firstName?: string;
    lastName?: string;
    novaPoshtaData?: {
      city: string;
      warehouse: string;
    };
  };
  onBack: () => void;
}

export function StatusStep({
  number,
  verificationMethod,
  tariff,
  sim,
  delivery,
  onBack
}: StatusStepProps) {
  const getVerificationMethodName = (method: string) => {
    switch (method) {
      case 'bankid':
        return 'BankID';
      case 'dia':
        return 'Дія';
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Дані вашої заявки
        </h2>

        {/* Application Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {/* Phone Number */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Номер телефону</h3>
            <p className="mt-1 text-sm text-gray-900">{number}</p>
          </div>

          {/* Verification Method */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Спосіб верифікації</h3>
            <p className="mt-1 text-sm text-gray-900">
              {getVerificationMethodName(verificationMethod)}
            </p>
          </div>

          {/* Tariff */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Тарифний план</h3>
            <p className="mt-1 text-sm text-gray-900">{tariff}</p>
          </div>

          {/* SIM Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Тип SIM-карти</h3>
            <p className="mt-1 text-sm text-gray-900">
              {sim.isESim ? 'eSIM' : 'Фізична SIM-карта'}
            </p>
          </div>

          {/* Delivery Details */}
          {!sim.isESim && delivery.method === 'nova_poshta' && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Доставка</h3>
              <div className="mt-1 text-sm text-gray-900">
                <p>Нова Пошта</p>
                <p className="mt-1">
                  {delivery.firstName} {delivery.lastName}
                </p>
                <p className="mt-1">
                  {delivery.novaPoshtaData?.city}, відділення {delivery.novaPoshtaData?.warehouse}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Наступні кроки
        </h3>
        <div className="space-y-2">
          {sim.isESim ? (
            <>
              <p className="text-sm text-blue-700">
                1. Очікуйте повідомлення в Telegram для верифікації
              </p>
              <p className="text-sm text-blue-700">
                2. Після успішної верифікації ви отримаєте QR-код для активації eSIM
              </p>
              <p className="text-sm text-blue-700">
                3. Відскануйте QR-код у налаштуваннях вашого телефону
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-blue-700">
                1. Очікуйте на SIM-карту у відділенні Нової Пошти
              </p>
              <p className="text-sm text-blue-700">
                2. Отримайте SIM-карту, пред'явивши документ
              </p>
              <p className="text-sm text-blue-700">
                3. Встановіть SIM-карту у ваш телефон
              </p>
            </>
          )}
        </div>
      </div>

      {/* Support Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Підтримка
        </h3>
        <p className="text-sm text-gray-600">
          Якщо у вас виникли питання, зверніться до служби підтримки Vodafone:
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-900">
            • Телефон: <a href="tel:+380800400111" className="text-vodafone-red">0800 400 111</a>
          </p>
          <p className="text-sm text-gray-900">
            • Email: <a href="mailto:support@vodafone.ua" className="text-vodafone-red">support@vodafone.ua</a>
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red"
        >
          На головну
        </button>
      </div>
    </div>
  );
}
