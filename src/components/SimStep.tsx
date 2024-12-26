import React, { useState } from 'react';

interface SimStepProps {
  onNext: (sim: { type: string; isESim: boolean }) => void;
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

export function SimStep({ onNext, onBack }: SimStepProps) {
  const [selectedType, setSelectedType] = useState('');
  const [showDevices, setShowDevices] = useState(false);

  const handleNext = () => {
    onNext({
      type: selectedType,
      isESim: selectedType === 'esim'
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">
          Оберіть тип SIM-карти
        </h2>
        
        {/* SIM card options */}
        <div className="grid grid-cols-1 gap-4">
          {/* Physical SIM */}
          <button
            type="button"
            onClick={() => {
              setSelectedType('physical');
              setShowDevices(false);
            }}
            className={`relative flex flex-col p-4 border rounded-lg ${
              selectedType === 'physical'
                ? 'border-vodafone-red ring-2 ring-vodafone-red bg-vodafone-red/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5,5.5V18.5C19.5,19.05 19.05,19.5 18.5,19.5H5.5C4.95,19.5 4.5,19.05 4.5,18.5V5.5C4.5,4.95 4.95,4.5 5.5,4.5H18.5C19.05,4.5 19.5,4.95 19.5,5.5M17.5,6.5H6.5V17.5H17.5V6.5M16,8V9.5H8V8H16M16,11V12.5H8V11H16M13,13.5V15H8V13.5H13Z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">
                  Фізична SIM-карта
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Отримайте SIM-карту у відділенні Нової Пошти
                </p>
              </div>
            </div>
          </button>

          {/* eSIM */}
          <button
            type="button"
            onClick={() => {
              setSelectedType('esim');
              setShowDevices(true);
            }}
            className={`relative flex flex-col p-4 border rounded-lg ${
              selectedType === 'esim'
                ? 'border-vodafone-red ring-2 ring-vodafone-red bg-vodafone-red/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1M8,6H16V7.5H8V6M9.5,19H14.5V20.5H9.5V19M8,12.5H16V14H8V12.5Z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">
                  eSIM
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Отримайте eSIM миттєво через Telegram
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Supported devices */}
        {showDevices && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Підтримувані пристрої
            </h3>
            <div className="space-y-4">
              {SUPPORTED_DEVICES.map((device) => (
                <div key={device.brand}>
                  <h4 className="text-sm font-medium text-gray-700">{device.brand}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {device.models.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedType}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vodafone-red hover:bg-vodafone-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Продовжити
        </button>
      </div>
    </div>
  );
}
