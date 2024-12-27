import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SimCardIcon from '@mui/icons-material/SimCard';

interface StatusStepProps {
  data: {
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
  };
  onBack: () => void;
}

export function StatusStep({ data, onBack }: StatusStepProps) {
  const isEsim = data.sim?.isESim;

  const getStatusSteps = () => {
    const steps = [
      {
        label: 'Замовлення прийнято',
        description: 'Ми отримали вашу заявку на перенесення номера',
        icon: <CheckIcon />,
        completed: true
      },
      {
        label: isEsim ? 'Підготовка eSIM' : 'Підготовка SIM-карти',
        description: isEsim 
          ? 'Ми готуємо вашу eSIM для активації'
          : 'Ми підготували вашу SIM-карту до відправки',
        icon: <SimCardIcon />,
        completed: true
      }
    ];

    if (!isEsim) {
      steps.push({
        label: 'Відправлення',
        description: `Очікується відправлення на відділення ${data.delivery?.novaPoshtaData?.city}, ${data.delivery?.novaPoshtaData?.warehouse}`,
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

    return steps;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Статус замовлення
      </Typography>
      
      {/* Информация о заказе */}
      <Paper elevation={0} sx={{ bgcolor: 'background.default', p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom color="primary">
          Інформація про замовлення
        </Typography>
        
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Номер телефону
            </Typography>
            <Typography variant="body1">
              {data.number?.phone}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Тарифний план
            </Typography>
            <Typography variant="body1">
              {data.tariff}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Тип SIM-карти
            </Typography>
            <Typography variant="body1">
              {isEsim ? 'eSIM' : 'Фізична SIM-карта'}
            </Typography>
          </Box>

          {!isEsim && data.delivery && (
            <>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Отримувач
                </Typography>
                <Typography variant="body1">
                  {data.delivery.firstName} {data.delivery.lastName}
                </Typography>
              </Box>
              
              {data.delivery.novaPoshtaData && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Адреса доставки
                  </Typography>
                  <Typography variant="body1">
                    м. {data.delivery.novaPoshtaData.city}, {data.delivery.novaPoshtaData.warehouse}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Paper>

      {/* Timeline */}
      <Paper elevation={0} sx={{ bgcolor: 'background.default', p: 3, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom color="primary">
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
          {isEsim 
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
