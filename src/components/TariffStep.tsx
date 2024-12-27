import React, { useState } from 'react';

interface TariffStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const TARIFFS = [
  {
    id: 'unlimited',
    name: 'Безліміт',
    price: '375₴/міс',
    recommended: true,
    features: [
      '🌐 Безлімітний інтернет',
      '📞 Безлімітні дзвінки',
      '✉️ Безлімітні SMS',
      '🌍 100 хвилин за кордон'
    ]
  },
  {
    id: 'superNet',
    name: 'SuperNet Start',
    price: '250₴/міс',
    features: [
      '🌐 20 ГБ інтернету',
      '📞 Безлімітні дзвінки',
      '✉️ 50 SMS',
      '🌍 50 хвилин за кордон'
    ]
  },
  {
    id: 'basic',
    name: 'Базовий',
    price: '150₴/міс',
    features: [
      '🌐 8 ГБ інтернет',
      '📞 500 хвилин',
      '✉️ 50 SMS',
      '🌍 5 ГБ роумінг в ЄС'
    ]
  }
];

export function TariffStep({ onNext, onBack }: TariffStepProps) {
  const [selectedTariff, setSelectedTariff] = useState('');

  const handleSubmit = () => {
    const tariff = TARIFFS.find(t => t.id === selectedTariff);
    onNext({
      tariff: tariff?.name,
      tariffPrice: tariff?.price
    });
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Оберіть тарифний план
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Оберіть тариф, який найкраще підходить вашим потребам. Ви зможете змінити його в будь-який час після переносу номера.
        </p>
      </div>

      <div className="space-y-4 mt-6">
        {TARIFFS.map((tariff) => (
          <div
            key={tariff.id}
            className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
              selectedTariff === tariff.id 
                ? 'ring-2 ring-vodafone-red shadow-lg transform scale-[1.02]' 
                : 'border border-gray-200 hover:border-gray-300 hover:shadow'
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedTariff(tariff.id)}
              className="w-full text-left"
            >
              <div className="p-4">
                {tariff.recommended && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Рекомендуємо
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedTariff === tariff.id
                        ? 'border-vodafone-red'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedTariff === tariff.id && (
                      <div className="w-2 h-2 rounded-full bg-vodafone-red" />
                    )}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {tariff.name}
                </h3>
                
                <div className="text-xl font-bold text-vodafone-red mb-3">
                  {tariff.price}
                </div>

                <div className="space-y-2">
                  {tariff.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start text-sm text-gray-600"
                    >
                      <span className="mr-2">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedTariff}
          className="flex-1 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-vodafone-red hover:bg-vodafone-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Продовжити
        </button>
      </div>
    </div>
  );
}
