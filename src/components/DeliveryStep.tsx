import React, { useState } from 'react';
import { NovaPoshtaSelect } from './NovaPoshtaSelect';
import { StatusTimeline } from './StatusTimeline';
import { Paper, Box, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Форма доставки */}
        <Paper elevation={3} className="p-6 space-y-6">
          <Box className="flex items-center space-x-4">
            <img
              src="/logo-novaya-pochta.png"
              alt="Нова Пошта"
              className="h-8 w-auto"
            />
            <Box>
              <Typography variant="h6" className="text-gray-900">
                Доставка Новою Поштою
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Оберіть відділення Нової Пошти, куди ми доставимо вашу SIM-карту
              </Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Box className="grid grid-cols-2 gap-4">
              <TextField
                label="Ім'я"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                fullWidth
                required
              />
            </Box>

            <NovaPoshtaSelect onSelect={setNovaPoshtaData} />

            <Box className="flex space-x-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onBack}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red"
              >
                Назад
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!isFormValid()}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vodafone-red hover:bg-vodafone-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vodafone-red disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Продовжити
              </motion.button>
            </Box>
          </form>
        </Paper>

        {/* Статус Timeline */}
        <Paper elevation={3} className="p-6">
          <Typography variant="h6" className="mb-4 text-gray-900">
            Статус замовлення
          </Typography>
          <StatusTimeline currentStatus="ordered" />
        </Paper>
      </Box>
    </motion.div>
  );
}
