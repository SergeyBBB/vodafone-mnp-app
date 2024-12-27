import React, { useState } from 'react';
import { NovaPoshtaSelect } from './NovaPoshtaSelect';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

interface DeliveryStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function DeliveryStep({ onNext, onBack }: DeliveryStepProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      delivery: {
        method: 'nova_poshta',
        firstName,
        lastName,
        novaPoshtaData: {
          city: selectedCity,
          warehouse: selectedWarehouse,
        },
      },
    });
  };

  const isFormValid = () => {
    return firstName.trim() !== '' && 
           lastName.trim() !== '' && 
           selectedCity !== '' && 
           selectedWarehouse !== '';
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Доставка Новою Поштою
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Оберіть відділення Нової Пошти, куди ми доставимо вашу SIM-карту
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField
            required
            label="Ім'я"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Прізвище"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
          <NovaPoshtaSelect
            selectedCity={selectedCity}
            selectedWarehouse={selectedWarehouse}
            onCityChange={setSelectedCity}
            onWarehouseChange={setSelectedWarehouse}
          />
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button 
          onClick={onBack} 
          variant="outlined"
          sx={{ color: 'text.secondary', borderColor: 'grey.300' }}
        >
          Назад
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
          sx={{
            bgcolor: 'error.main',
            '&:hover': {
              bgcolor: 'error.dark',
            },
          }}
        >
          Продовжити
        </Button>
      </Box>
    </Box>
  );
}
