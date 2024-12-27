import React, { useState } from 'react';
import { Box, Typography, Button, Paper, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

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

export function SimStep({ onNext, onBack }: SimStepProps) {
  const [selectedType, setSelectedType] = useState('');
  const [email, setEmail] = useState('');
  const [showDevices, setShowDevices] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      sim: {
        type: selectedType,
        isESim: selectedType === 'esim',
        email: selectedType === 'esim' ? email : undefined,
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Оберіть тип SIM-карти
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              if (e.target.value === 'esim') {
                setShowDevices(true);
              } else {
                setShowDevices(false);
              }
            }}
          >
            <FormControlLabel
              value="physical"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">
                    Фізична SIM-карта
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Доставимо карту Новою Поштою
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value="esim"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">
                    eSIM
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Електронна SIM-карта, яку можна активувати онлайн
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        {selectedType === 'esim' && (
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              label="Email для отримання eSIM"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="На цю адресу ми надішлемо QR-код для активації eSIM"
            />
          </Box>
        )}

        {showDevices && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Підтримувані пристрої
            </Typography>
            {SUPPORTED_DEVICES.map((device) => (
              <Box key={device.brand}>
                <Typography variant="body1" gutterBottom>
                  {device.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {device.models.join(', ')}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
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
          disabled={!selectedType || (selectedType === 'esim' && !email)}
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
