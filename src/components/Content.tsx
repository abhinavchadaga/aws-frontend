import { Center } from '@mantine/core';
import DatasetUpload from './DatasetUpload';
import { useAppSelector } from '../redux/hooks';
import { getStage } from '../redux/selectors';
import ConfigureTraining from './ConfigureTraining';
import ConfirmationScreen from './ConfirmationScreen';
import TrainingProgress from './TrainingProgress';

export default function Content() {
  const { stage } = useAppSelector(getStage);
  return (
    <>
      {stage !== 'training' && (
        <Center pt={20}>
          {stage === 'uploadDataset' && <DatasetUpload />}
          {stage === 'configureTraining' && <ConfigureTraining />}
          {stage === 'confirmationScreen' && <ConfirmationScreen />}
        </Center>
      )}
      {stage === 'training' && <TrainingProgress />}
    </>
  );
}
