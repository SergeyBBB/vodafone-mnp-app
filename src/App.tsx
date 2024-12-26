import React, { useState } from 'react';
import { NumberStep } from './components/NumberStep';
import { TariffStep } from './components/TariffStep';
import { SimStep } from './components/SimStep';
import { DeliveryStep } from './components/DeliveryStep';
import { StatusStep } from './components/StatusStep';

interface StepData {
  number?: { phone: string; verificationMethod: string };
  tariff?: string;
  sim?: { type: string; isESim: boolean };
  delivery?: {
    method: string;
    firstName: string;
    lastName: string;
    novaPoshtaData?: {
      city: string;
      warehouse: string;
    };
  };
}

export function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<StepData>({});

  const handleNext = (stepData: any) => {
    setData({ ...data, ...stepData });
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NumberStep onNext={(number, verificationMethod) => handleNext({ number: { phone: number, verificationMethod } })} onBack={handleBack} />;
      case 2:
        return <TariffStep onNext={(tariff) => handleNext({ tariff })} onBack={handleBack} />;
      case 3:
        return <SimStep onNext={(sim) => handleNext({ sim })} onBack={handleBack} />;
      case 4:
        return data.sim?.isESim ? (
          <StatusStep
            number={data.number?.phone || ''}
            verificationMethod={data.number?.verificationMethod || ''}
            tariff={data.tariff || ''}
            sim={data.sim}
            delivery={{ method: 'telegram' }}
            onBack={() => setCurrentStep(1)}
          />
        ) : (
          <DeliveryStep onNext={(delivery) => handleNext({ delivery })} onBack={handleBack} />
        );
      case 5:
        return (
          <StatusStep
            number={data.number?.phone || ''}
            verificationMethod={data.number?.verificationMethod || ''}
            tariff={data.tariff || ''}
            sim={data.sim}
            delivery={data.delivery}
            onBack={() => setCurrentStep(1)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <img
            src="/Vodafone_logo_2017.png"
            alt="Vodafone"
            className="h-8"
          />
          <h1 className="text-xl font-medium text-gray-900">
            Перенесення номера
          </h1>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStep
                        ? 'bg-vodafone-red text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {step === 1 && 'Номер'}
                    {step === 2 && 'Тариф'}
                    {step === 3 && 'SIM-карта'}
                    {step === 4 && (data.sim?.isESim ? 'Статус' : 'Доставка')}
                  </div>
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      step < currentStep ? 'bg-vodafone-red' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
