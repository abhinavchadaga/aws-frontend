import { Button, Group, Stack, Title } from '@mantine/core';
import { Download, X } from 'tabler-icons-react';

import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { saveAs } from 'file-saver';

export default function DownloadTrainedModel() {
  const handleDownload = () => {
    axios
      .get('http://localhost:3000/download-model', {
        responseType: 'blob',
      })
      .then((res) => {
        saveAs(res.data, 'model.pth');
      })
      .then(() => {
        axios
          .delete('http://localhost:3000/dataset/delete')
          .catch((err) => console.error(err));
      })
      .catch(() => {
        notifications.show({
          message: 'Error downloading model',
          icon: <X />,
          color: 'red',
        });
      });
  };

  return (
    <Stack mt={100} spacing="lg">
      <Title order={3}>Training Complete</Title>
      <Group position="center">
        <Button color="teal" leftIcon={<Download />} onClick={handleDownload}>
          Download Model
        </Button>
      </Group>
    </Stack>
  );
}
