import {
  Box,
  Button,
  Group,
  NativeSelect,
  NumberInput,
  Stack,
  Title,
} from '@mantine/core';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { notifications } from '@mantine/notifications';
import { useRef } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setStage } from '../redux/slices/stageSlice';
import {
  TrainingConfigState,
  setTrainingConfig,
} from '../redux/slices/trainingConfigSlice';

export default function ConfigureTraining() {
  const dispatch = useAppDispatch();
  const modelArchSelectRef = useRef<HTMLSelectElement>(null);
  const maxEpochsInputRef = useRef<HTMLInputElement>(null);
  const learningRateInputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
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

  const handleSubmit = () => {
    const modelArch = modelArchSelectRef.current?.value ?? 'alexnet';
    const maxEpochs = maxEpochsInputRef.current?.value ?? '10';
    const learningRate = learningRateInputRef.current?.value ?? '0.00005';

    axios
      .post(
        'http://localhost:3000/configure-training',
        {
          modelArch,
          maxEpochs,
          learningRate,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((res: AxiosResponse) => {
        dispatch(setStage('confirmationScreen'));
        notifications.show({
          id: 'successfully-configured-training',
          message: 'successfully configured training',
          color: 'green',
          autoClose: 2000,
        });
        dispatch(
          setTrainingConfig(res.data.trainingConfig as TrainingConfigState),
        );
      })
      .catch((error: Error | AxiosError) => {
        let message = 'error configuring training';
        if (axios.isAxiosError(error)) {
          message = error.response?.data.message ?? message;
        }
        notifications.show({
          id: 'error-configuring-training',
          message,
          color: 'red',
          autoClose: 2000,
        });
        console.log(error);
      });
  };

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing.lg,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[1],
      })}
    >
      <Stack spacing="md">
        <Title order={3}>Configure Training Options</Title>
        <NativeSelect
          ref={modelArchSelectRef}
          data={['alexnet', 'resnet', 'vgg']}
          defaultValue="alexnet"
          label="Model Architecture"
          description="Select the model architecture to fine-tune"
        />
        <NumberInput
          ref={maxEpochsInputRef}
          defaultValue={10}
          label="Max Epochs"
          description="Maximum number of epochs to fine-tune for"
        />
        <NumberInput
          ref={learningRateInputRef}
          defaultValue={0.00005}
          precision={5}
          step={0.00001}
          label="Learning Rate"
          description="Scientific notation is supported (e.g. 3e-5)"
        />
        <Group position="apart" grow>
          <Button color="teal" w="50%" onClick={handleSubmit}>
            Submit
          </Button>
          <Button color="gray" variant="outline" w="50%" onClick={handleBack}>
            Back
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
