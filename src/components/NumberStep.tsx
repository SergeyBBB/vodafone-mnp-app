import React, { useState, useEffect } from 'react';

interface NumberStepProps {
  onNext: (number: string, verificationMethod: string) => void;
  onBack: () => void;
}

const VERIFICATION_METHODS = [
  {
    id: 'bankid',
    name: 'BankID',
    description: 'Верифікація через BankID',
    logos: [
      { src: '/monobank-logo.png', alt: 'Monobank' },
      { src: '/95229470.png', alt: 'PrivatBank' }
    ]
  },
  {
    id: 'dia',
    name: 'Дія',
    description: 'Верифікація через додаток Дія',
    logos: [{ src: '/DiiaLogo.svg.png', alt: 'Дія' }]
  }
];

// Функція для форматування номера телефону
const formatPhoneNumber = (value: string) => {
  // Видаляємо всі нецифрові символи
  const numbers = value.replace(/\D/g, '');
  
  // Якщо номер починається з 380, форматуємо його
  if (numbers.startsWith('380')) {
    return numbers.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
  }
  
  // Якщо номер починається з 0, додаємо 38 і форматуємо
  if (numbers.startsWith('0')) {
    const withCode = '38' + numbers;
    return withCode.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
  }
  
  return value;
};

// Функція для валідації номера телефону
const isValidPhoneNumber = (number: string) => {
  const digits = number.replace(/\D/g, '');
  return digits.length === 12 && (digits.startsWith('380'));
};

export function NumberStep({ onNext, onBack }: NumberStepProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('');
  const [error, setError] = useState('');

  // Функція для автоматичного форматування при вводі
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);

    // Валідація
    if (formattedValue && !isValidPhoneNumber(formattedValue)) {
      setError('Введіть коректний номер телефону');
    } else {
      setError('');
    }
  };

  // Функція для обробки вставки номера
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const formattedValue = formatPhoneNumber(pastedText);
    setPhoneNumber(formattedValue);
  };

  const handleSubmit = () => {
    if (isValidPhoneNumber(phoneNumber) && verificationMethod) {
      onNext(phoneNumber, verificationMethod);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Phone Number Input */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Номер телефону
        </label>
        <div className="mt-1">
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onPaste={handlePaste}
            placeholder="+380 (XX) XXX-XX-XX"
            className={`block w-full rounded-md shadow-sm ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-vodafone-red focus:ring-vodafone-red'
            } sm:text-sm`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Verification Methods */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Спосіб верифікації
        </label>
        <div className="space-y-2">
          {VERIFICATION_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setVerificationMethod(method.id)}
              className={`w-full flex items-center p-4 border rounded-lg ${
                verificationMethod === method.id
                  ? 'border-vodafone-red ring-2 ring-vodafone-red bg-vodafone-red/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                {method.logos.map((logo, index) => (
                  <img
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 w-8 object-contain"
                  />
                ))}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {method.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {method.description}
                </p>
              </div>
            </button>
          ))}
        </div>
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
          onClick={handleSubmit}
          disabled={!isValidPhoneNumber(phoneNumber) || !verificationMethod}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vodafone-red hover:bg-vodafone-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Продовжити
        </button>
      </div>
    </div>
  );
}
