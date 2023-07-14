import { Container, Progress, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

type TrainingStatus =
  | 'not started'
  | 'started'
  | 'training'
  | 'validating'
  | 'complete'
  | 'error';

interface TrainingProgress {
  stepsComplete: number;
  maxSteps: number;
  trainingLoss: number | null;
  validationLoss: number | null;
  status: TrainingStatus;
}

export default function TrainingProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<TrainingStatus>('not started');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/train/status');
    eventSource.onmessage = (event) => {
      console.log(event.data);
      const update = JSON.parse(event.data) as TrainingProgress;
      const newProgress = update.maxSteps
        ? (update.stepsComplete / update.maxSteps) * 100
        : 0;
      setProgress(newProgress);
      setStatus(update.status);

      if (update.status === 'complete' || update.status === 'error') {
        console.log('closing event source');
        eventSource.close();
      }
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <Container>
      <Progress
        key={progress}
        value={progress}
        size="lg"
        animate={progress !== 100}
      />
      <Stack>
        <Text>progress: {progress}</Text>
        <Text>{status}</Text>
      </Stack>
    </Container>
  );
}
