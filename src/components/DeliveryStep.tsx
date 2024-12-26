import React, { useState } from 'react';
import { NovaPoshtaSelect } from './NovaPoshtaSelect';

interface DeliveryStepProps {
  onNext: (delivery: any) => void;
  onBack: () => void;
}

export function DeliveryStep({ onNext, onBack }: DeliveryStepProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [novaPoshtaData, setNovaPoshtaData] = useState<{ city: string; warehouse: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      method: 'nova_poshta',
      firstName,
      lastName,
      novaPoshtaData
    });
  };

  const isFormValid = () => {
    return firstName.trim() !== '' && 
           lastName.trim() !== '' && 
           novaPoshtaData?.city && 
           novaPoshtaData?.warehouse;
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src="/logo-novaya-pochta.png"
            alt="Нова Пошта"
            className="h-8 w-auto"
          />
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Доставка Новою Поштою
            </h2>
            <p className="text-sm text-gray-500">
              Оберіть відділення Нової Пошти, куди ми доставимо вашу SIM-карту
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Ім'я
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vodafone-red focus:ring-vodafone-red sm:text-sm"
                placeholder="Введіть ім'я"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Прізвище
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vodafone-red focus:ring-vodafone-red sm:text-sm"
                placeholder="Введіть прізвище"
              />
            </div>
          </div>

          {/* Nova Poshta Select */}
          <div className="space-y-4">
            <NovaPoshtaSelect onSelect={setNovaPoshtaData} />
          </div>

          {/* Navigation */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red"
            >
              Назад
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vodafone-red hover:bg-vodafone-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Продовжити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
