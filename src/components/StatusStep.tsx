import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SimCardIcon from '@mui/icons-material/SimCard';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

interface StatusStepProps {
  formData: {
    phone: string;
    tariff: string;
    tariffPrice: string;
    sim?: { type: string; isESim: boolean; email?: string };
    delivery?: {
      method: string;
      firstName: string;
      lastName: string;
      novaPoshtaData?: {
        city: string;
        warehouse: string;
      };
    };
  };
  onBack: () => void;
}

export function StatusStep({ formData, onBack }: StatusStepProps) {
  const isESim = formData.sim?.isESim;

  const getStatusSteps = () => {
    const steps = [
      {
        label: 'Замовлення прийнято',
        description: 'Ми отримали вашу заявку на перенесення номера',
        icon: <CheckIcon />,
        completed: true
      },
      {
        label: isESim ? 'Підготовка eSIM' : 'Підготовка SIM-карти',
        description: isESim 
          ? 'Ми готуємо вашу eSIM для активації'
          : 'Ми підготували вашу SIM-карту до відправки',
        icon: <SimCardIcon />,
        completed: true
      }
    ];

    if (!isESim) {
      steps.push({
        label: 'Відправлення',
        description: `Очікується відправлення на відділення ${formData.delivery?.novaPoshtaData?.city}, ${formData.delivery?.novaPoshtaData?.warehouse}`,
        icon: <LocalShippingIcon />,
        completed: false
      });
    }

    steps.push({
      label: 'Перенесення номера',
      description: 'Очікується підтвердження від поточного оператора',
      icon: <PhoneForwardedIcon />,
      completed: false
    });

    if (isESim) {
      steps.push({
        label: 'Відправка eSIM',
        description: 'Очікується відправка eSIM на вказану email адресу',
        icon: <MailOutlineIcon />,
        completed: false
      });
    }

    return steps;
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {isESim ? 'Статус замовлення eSIM' : 'Статус замовлення SIM-карти'}
      </Typography>

      {/* Order Summary */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Інформація про замовлення
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Номер телефону:</strong> {formData.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Тарифний план:</strong> {formData.tariff} ({formData.tariffPrice} ₴/міс)
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Тип SIM-карти:</strong> {isESim ? 'eSIM' : 'Фізична SIM-карта'}
          </Typography>
          {isESim && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Email для отримання eSIM:</strong> {formData.sim?.email}
            </Typography>
          )}
          {!isESim && formData.delivery && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Отримувач:</strong> {formData.delivery.firstName} {formData.delivery.lastName}
              </Typography>
              {formData.delivery.novaPoshtaData && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Адреса доставки:</strong> м. {formData.delivery.novaPoshtaData.city}, {formData.delivery.novaPoshtaData.warehouse}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Paper>

      {/* Timeline */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Статус перенесення
        </Typography>
        
        <Timeline>
          {getStatusSteps().map((step, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color={step.completed ? "success" : "grey"}>
                  {step.icon}
                </TimelineDot>
                {index < getStatusSteps().length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle2">
                  {step.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {isESim 
            ? "Ми повідомимо вас, коли eSIM буде готова до активації та надішлемо інструкції щодо її встановлення."
            : "Ми повідомимо вас про відправлення SIM-карти та надамо номер для відстеження посилки."}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onBack}>
          Назад
        </Button>
      </Box>
    </Box>
  );
}
