import React from 'react';

interface TariffStepProps {
  onNext: (tariffId: string) => void;
  onBack: () => void;
}

const TARIFFS = [
  {
    id: 'unlimited',
    name: 'Безліміт',
    price: '300₴/міс',
    recommended: true,
    features: [
      '🌐 Безлімітний інтернет',
      '📞 Безлімітні дзвінки',
      '✉️ Безлімітні SMS',
      '🌍 20 ГБ роумінг в ЄС'
    ]
  },
  {
    id: 'superNet',
    name: 'SuperNet',
    price: '250₴/міс',
    features: [
      '🌐 25 ГБ інтернет',
      '📞 3000 хвилин',
      '✉️ 100 SMS',
      '🌍 10 ГБ роумінг в ЄС'
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
  const [selectedTariff, setSelectedTariff] = React.useState<string>('');

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="space-y-3">
        {TARIFFS.map((tariff) => (
          <div
            key={tariff.id}
            className={`bg-white rounded-lg border p-4 ${
              selectedTariff === tariff.id 
                ? 'border-vodafone-red shadow-sm' 
                : 'border-gray-100'
            }`}
          >
            <button
              onClick={() => setSelectedTariff(tariff.id)}
              className="w-full text-left"
            >
              <div className="flex items-start gap-3">
                {/* Radio button */}
                <div className="mt-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedTariff === tariff.id
                        ? 'border-vodafone-red'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedTariff === tariff.id && (
                      <div className="w-3 h-3 rounded-full bg-vodafone-red" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tariff.name}
                    </h3>
                    {tariff.recommended && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Рекомендуємо
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xl font-bold text-vodafone-red mb-2">
                    {tariff.price}
                  </div>

                  <div className="space-y-1.5">
                    {tariff.features.map((feature, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="btn btn-secondary"
        >
          Назад
        </button>
        <button
          onClick={() => selectedTariff && onNext(selectedTariff)}
          disabled={!selectedTariff}
          className="btn btn-primary flex-1"
        >
          Продовжити
        </button>
      </div>
    </div>
  );
}
