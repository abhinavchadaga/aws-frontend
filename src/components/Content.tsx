import { Center } from '@mantine/core';
import DatasetUpload from './DatasetUpload';
import { useAppSelector } from '../redux/hooks';
import { getStage } from '../redux/selectors';
import ConfigureTraining from './ConfigureTraining';

export default function Content() {
  const { stage } = useAppSelector(getStage);
  return (
    <Center pt={20}>
      {stage === 'uploadDataset' && <DatasetUpload />}
      {stage === 'configureTraining' && <ConfigureTraining />}
    </Center>
  );
}
