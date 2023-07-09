import { Stack, Text, Title } from '@mantine/core';

export function Header() {
  return (
    <Stack align="center" mt={50}>
      <Title order={1}>AWS - Abhinav Web Services</Title>
      <Text size="md">Upload a dataset and train a model on an NVIDIA RTX 3090</Text>
    </Stack>
  );
}
