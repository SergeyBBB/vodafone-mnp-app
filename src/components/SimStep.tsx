import React, { useState } from 'react';

interface SimStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const SUPPORTED_DEVICES = [
  {
    brand: 'iPhone',
    models: ['iPhone XS', 'iPhone XS Max', 'iPhone XR', 'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 'iPhone 12', 'iPhone 12 Mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max', 'iPhone 13', 'iPhone 13 Mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max']
  },
  {
    brand: 'Samsung',
    models: ['Galaxy S20', 'Galaxy S20+', 'Galaxy S20 Ultra', 'Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra', 'Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra', 'Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra', 'Galaxy Z Fold 2', 'Galaxy Z Fold 3', 'Galaxy Z Fold 4', 'Galaxy Z Flip 3', 'Galaxy Z Flip 4']
  },
  {
    brand: 'Google Pixel',
    models: ['Pixel 3', 'Pixel 3 XL', 'Pixel 3a', 'Pixel 3a XL', 'Pixel 4', 'Pixel 4 XL', 'Pixel 4a', 'Pixel 5', 'Pixel 5a', 'Pixel 6', 'Pixel 6 Pro', 'Pixel 6a', 'Pixel 7', 'Pixel 7 Pro', 'Pixel 7a', 'Pixel 8', 'Pixel 8 Pro']
  }
];

const SIM_OPTIONS = [
  {
    id: 'physical',
    name: 'Фізична SIM-карта',
    description: 'Отримайте класичну SIM-карту з доставкою',
    features: [
      '📦 Безкоштовна доставка',
      '🔄 Легка заміна карти',
      '📱 Працює з усіма пристроями'
    ]
  },
  {
    id: 'esim',
    name: 'eSIM',
    description: 'Цифрова SIM-карта для сумісних пристроїв',
    features: [
      '⚡️ Миттєва активація',
      '🌍 Зручно для подорожей',
      '📱 Підтримка dual SIM'
    ]
  }
];

export function SimStep({ onNext, onBack }: SimStepProps) {
  const [selectedSim, setSelectedSim] = useState('');
  const [email, setEmail] = useState('');
  const [showDevices, setShowDevices] = useState(false);

  const handleSubmit = () => {
    onNext({
      sim: {
        type: selectedSim,
        isESim: selectedSim === 'esim',
        email: selectedSim === 'esim' ? email : undefined
      }
    });
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Оберіть тип SIM-карти
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Виберіть зручний для вас варіант SIM-карти
        </p>
      </div>

      <div className="space-y-4 mt-6">
        {SIM_OPTIONS.map((option) => (
          <div
            key={option.id}
            className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
              selectedSim === option.id 
                ? 'ring-2 ring-vodafone-red shadow-lg transform scale-[1.02]' 
                : 'border border-gray-200 hover:border-gray-300 hover:shadow'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedSim(option.id);
                if (option.id === 'esim') {
                  setShowDevices(true);
                } else {
                  setShowDevices(false);
                }
              }}
              className="w-full text-left"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedSim === option.id
                        ? 'border-vodafone-red'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedSim === option.id && (
                      <div className="w-2 h-2 rounded-full bg-vodafone-red" />
                    )}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {option.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  {option.description}
                </p>

                <div className="space-y-2">
                  {option.features.map((feature, index) => (
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

      {selectedSim === 'esim' && (
        <>
          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email для отримання eSIM
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-vodafone-red focus:ring-vodafone-red sm:text-sm"
                placeholder="example@email.com"
                required={selectedSim === 'esim'}
              />
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Підтримувані пристрої
            </h4>
            <div className="space-y-4">
              {SUPPORTED_DEVICES.map((device) => (
                <div key={device.brand} className="space-y-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {device.brand}
                  </h5>
                  <p className="text-sm text-gray-500">
                    {device.models.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
          disabled={!selectedSim || (selectedSim === 'esim' && !email)}
          className="flex-1 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-vodafone-red hover:bg-vodafone-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Продовжити
        </button>
      </div>
    </div>
  );
}
