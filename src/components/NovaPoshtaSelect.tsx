import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface NovaPoshtaSelectProps {
  selectedCity: string;
  selectedWarehouse: string;
  onCityChange: (city: string) => void;
  onWarehouseChange: (warehouse: string) => void;
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
  'Одеса': [
    'Відділення №1: вул. Дерибасівська, 1',
    'Відділення №2: пр. Шевченка, 50',
  ],
  'Дніпро': [
    'Відділення №1: пр. Дмитра Яворницького, 50',
    'Відділення №2: вул. Робоча, 77',
  ],
  'Львів': [
    'Відділення №1: пл. Ринок, 1',
    'Відділення №2: вул. Городоцька, 359',
  ],
};

export function NovaPoshtaSelect({ 
  selectedCity,
  selectedWarehouse,
  onCityChange,
  onWarehouseChange
}: NovaPoshtaSelectProps) {
  return (
    <>
      <FormControl fullWidth required>
        <InputLabel>Місто</InputLabel>
        <Select
          value={selectedCity}
          label="Місто"
          onChange={(e) => {
            onCityChange(e.target.value);
            onWarehouseChange('');
          }}
        >
          {CITIES.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCity && (
        <FormControl fullWidth required>
          <InputLabel>Відділення або поштомат</InputLabel>
          <Select
            value={selectedWarehouse}
            label="Відділення або поштомат"
            onChange={(e) => onWarehouseChange(e.target.value)}
          >
            {WAREHOUSES[selectedCity as keyof typeof WAREHOUSES]?.map((warehouse) => (
              <MenuItem key={warehouse} value={warehouse}>
                {warehouse}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
