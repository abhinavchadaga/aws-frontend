import { Button, Text, FileButton, Flex, Group } from '@mantine/core';
import { useRef, useState } from 'react';
import { FileZip, Upload, Check, X } from 'tabler-icons-react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { useAppDispatch } from '../redux/hooks';
import { setStage } from '../redux/slices/stageSlice';

export default function DatasetUpload() {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const handleUpload = () => {
    if (file) {
      notifications.show({
        id: 'uploading-dataset',
        message: 'uploading dataset...',
        loading: true,
      });
      const formData = new FormData();
      formData.append('dataset', file);
      axios
        .post('http://localhost:3000/dataset/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          notifications.update({
            id: 'uploading-dataset',
            message: 'dataset uploaded',
            loading: false,
            icon: <Check />,
            color: 'teal',
            autoClose: 2000,
          });
          dispatch(setStage('configureTraining'));
        })
        .catch(() => {
          notifications.update({
            id: 'uploading-dataset',
            message: 'failed to upload dataset',
            icon: <X />,
            loading: false,
            color: 'red',
          });
          dispatch(setStage('uploadDataset'));
        });
    }
  };

  return (
    <>
      <Flex direction="column">
        <FileButton resetRef={resetRef} onChange={setFile} accept=".zip">
          {({ onClick }) => {
            if (file == null) {
              return (
                <Group position="center">
                  <Button onClick={onClick} leftIcon={<FileZip />} size="lg">
                    Select Dataset
                  </Button>
                </Group>
              );
            }
            return (
              <Group position="center">
                <Button
                  leftIcon={<Upload />}
                  size="lg"
                  color="teal"
                  w={150}
                  onClick={handleUpload}
                >
                  Upload
                </Button>
                <Button size="lg" color="red" onClick={clearFile} w={150}>
                  Reset
                </Button>
              </Group>
            );
          }}
        </FileButton>
        {file && (
          <Text align="center" size="sm" mt="xs">
            Selected File: {file.name}
          </Text>
        )}
      </Flex>
    </>
  );
}
