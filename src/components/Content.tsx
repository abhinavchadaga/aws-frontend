import { Center } from '@mantine/core';
import ConfigureTraining from './ConfigureTraining';
import ConfirmationScreen from './ConfirmationScreen';
import DatasetUpload from './DatasetUpload';
import DownloadTrainedModel from './DownloadTrainedModel';
import TrainingProgress from './TrainingProgress';
import { getStage } from '../redux/selectors';
import { useAppSelector } from '../redux/hooks';

export default function Content() {
  const { stage } = useAppSelector(getStage);
  return (
    <>
      {stage !== 'training' && (
        <Center pt={20}>
          {stage === 'uploadDataset' && <DatasetUpload />}
          {stage === 'configureTraining' && <ConfigureTraining />}
          {stage === 'confirmationScreen' && <ConfirmationScreen />}
          {stage === 'downloadTrainedModel' && <DownloadTrainedModel />}
        </Center>
      )}
      {stage === 'training' && <TrainingProgress />}
    </>
  );
}
