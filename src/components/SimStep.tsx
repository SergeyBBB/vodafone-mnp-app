import React, { useState } from 'react';
import { Box, Typography, Button, Paper, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

interface SimStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function SimStep({ onNext, onBack }: SimStepProps) {
  const [simType, setSimType] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      sim: {
        type: simType,
        isESim: simType === 'esim',
        email: simType === 'esim' ? email : undefined,
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
            value={simType}
            onChange={(e) => setSimType(e.target.value)}
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

        {simType === 'esim' && (
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
          disabled={!simType || (simType === 'esim' && !email)}
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
