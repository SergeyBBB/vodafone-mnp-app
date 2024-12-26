import React, { useState } from 'react';

interface NovaPoshtaSelectProps {
  onSelect: (data: { city: string; warehouse: string }) => void;
}

// Это временные данные, в реальном приложении нужно использовать API Новой Почты
const CITIES = [
  'Київ',
  'Харків',
  'Одеса',
  'Дніпро',
  'Львів',
];

const WAREHOUSES = {
  'Київ': [
    'Відділення №1: вул. Хрещатик, 22',
    'Відділення №2: вул. Велика Васильківська, 100',
    'Поштомат №1: ТРЦ Ocean Plaza',
  ],
  'Харків': [
    'Відділення №1: вул. Сумська, 25',
    'Відділення №2: пр. Науки, 14',
    'Поштомат №1: ТРЦ Караван',
  ],
};

export function NovaPoshtaSelect({ onSelect }: NovaPoshtaSelectProps) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedWarehouse('');
  };

  const handleWarehouseChange = (warehouse: string) => {
    setSelectedWarehouse(warehouse);
    onSelect({ city: selectedCity, warehouse });
  };

  return (
    <div className="space-y-4">
      {/* City Select */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Місто
        </label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vodafone-red focus:ring-vodafone-red sm:text-sm"
        >
          <option value="">Оберіть місто</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Warehouse Select */}
      {selectedCity && (
        <div>
          <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700">
            Відділення або поштомат
          </label>
          <select
            id="warehouse"
            value={selectedWarehouse}
            onChange={(e) => handleWarehouseChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vodafone-red focus:ring-vodafone-red sm:text-sm"
          >
            <option value="">Оберіть відділення</option>
            {WAREHOUSES[selectedCity as keyof typeof WAREHOUSES]?.map((warehouse) => (
              <option key={warehouse} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
