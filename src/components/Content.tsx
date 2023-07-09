import { Center } from '@mantine/core';
import DatasetUpload from './DatasetUpload';
import { useAppSelector } from '../redux/hooks';
import { getStage } from '../redux/selectors';

export default function Content() {
  const { stage } = useAppSelector(getStage);
  return (
    <Center pt={100} pb={100}>
      {stage === 'uploadDataset' && <DatasetUpload />}
    </Center>
  );
}
