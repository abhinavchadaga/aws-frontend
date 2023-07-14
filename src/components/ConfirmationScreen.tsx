import { Button, Paper, Title, Text, Stack, Group } from '@mantine/core';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getTrainingConfig } from '../redux/selectors';
import { setStage } from '../redux/slices/stageSlice';

function camelCaseToNormalCase(input: string): string {
  const result = input.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function ConfirmationScreen() {
  const dispatch = useAppDispatch();
  const userConfigSelection = useAppSelector(getTrainingConfig);

  const handleStartTrain = () => {
    dispatch(setStage('training'));
    axios
      .get('http://localhost:3000/train/start')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          id: 'error-starting-training',
          message: 'failed to start training',
          color: 'red',
          autoClose: 2000,
        });
      });
  };

  const handleRestart = () => {
    dispatch(setStage('uploadDataset'));
    axios.delete('http://localhost:3000/dataset/delete').then(() => {
      notifications.show({
        id: 'dataset-deleted',
        message: 'dataset deleted',
        color: 'red',
        autoClose: 2000,
      });
    });
  };

  return (
    <Stack spacing="md" pt={100}>
      <Title order={3} align="center">
        Confirm Training Config
      </Title>
      <Group>
        {Object.entries(userConfigSelection).map(([option, selection]) => (
          <Paper shadow="xs" p="md" key={option}>
            <Title order={5}>{camelCaseToNormalCase(option)}</Title>
            <Text size="sm">{selection}</Text>
          </Paper>
        ))}
      </Group>
      <Group position="center">
        <Button size="lg" color="teal" onClick={handleStartTrain}>
          Train
        </Button>
        <Button size="lg" variant="outline" color="red" onClick={handleRestart}>
          Restart
        </Button>
      </Group>
    </Stack>
  );
}
