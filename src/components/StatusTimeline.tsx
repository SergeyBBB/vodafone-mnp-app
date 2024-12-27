import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import { CheckCircle, LocalShipping, SimCard, PhoneForwarded, Pending } from '@mui/icons-material';
import { motion } from 'framer-motion';

export interface StatusTimelineProps {
  currentStatus: 'ordered' | 'shipped' | 'delivered' | 'porting' | 'completed';
}

interface StatusStep {
  label: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const getStepStatus = (step: string): { completed: boolean; active: boolean } => {
    const statusOrder = ['ordered', 'shipped', 'delivered', 'porting', 'completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(step);
    
    return {
      completed: stepIndex < currentIndex,
      active: stepIndex === currentIndex
    };
  };

  const steps: StatusStep[] = [
    {
      label: 'Замовлено',
      description: 'SIM-карта замовлена',
      icon: <SimCard />,
      ...getStepStatus('ordered')
    },
    {
      label: 'Відправлено',
      description: 'SIM-карта відправлена Новою Поштою',
      icon: <LocalShipping />,
      ...getStepStatus('shipped')
    },
    {
      label: 'Доставлено',
      description: 'SIM-карта доставлена у відділення',
      icon: <CheckCircle />,
      ...getStepStatus('delivered')
    },
    {
      label: 'Перенесення',
      description: 'Процес переносу номера',
      icon: <PhoneForwarded />,
      ...getStepStatus('porting')
    },
    {
      label: 'Завершено',
      description: 'Номер успішно перенесено',
      icon: <CheckCircle />,
      ...getStepStatus('completed')
    }
  ];

  return (
    <Timeline position="right">
      {steps.map((step, index) => (
        <TimelineItem key={step.label}>
          <TimelineSeparator>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <TimelineDot
                color={step.completed ? 'success' : step.active ? 'primary' : 'grey'}
                variant={step.completed || step.active ? 'filled' : 'outlined'}
              >
                {step.icon}
              </TimelineDot>
            </motion.div>
            {index < steps.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Paper elevation={step.active ? 3 : 0} className={`p-3 ${step.active ? 'bg-vodafone-red/5' : ''}`}>
                <Typography variant="h6" component="h3" className={`${step.completed ? 'text-green-600' : step.active ? 'text-vodafone-red' : 'text-gray-500'}`}>
                  {step.label}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {step.description}
                </Typography>
              </Paper>
            </motion.div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
