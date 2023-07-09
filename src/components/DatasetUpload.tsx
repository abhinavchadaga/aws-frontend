import { Button, Text, FileButton, Flex, Group } from '@mantine/core';
import { useRef, useState } from 'react';
import { FileZip, Upload } from 'tabler-icons-react';

export default function DatasetUpload() {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const uploadFile = () => {
    if (file == null) return;
    const formData = new FormData();
    formData.append('dataset', file);
    fetch('http://localhost:3000/dataset/upload', {
      method: 'POST',
      body: formData,
    });
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
                  onClick={uploadFile}
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
