import { Button, Container, Grid, Skeleton, TextInput, Title, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const child = <Skeleton height={140} radius="md" animate={false} />;

export function RouteInput() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const navigate = useNavigate();

  const generateBriefing = () => {
    navigate(`/briefing/${departure}/${arrival}`);
  };

  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          <Title>Welcome!</Title>
          <Text>Please enter your flight details below...</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 6 }}>
          <TextInput
            label="Departure Airport"
            placeholder="ICAO Code"
            onChange={(e) => setDeparture(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6 }}>
          <TextInput
            label="Arrival Airport"
            placeholder="ICAO Code"
            onChange={(e) => setArrival(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <Button onClick={generateBriefing}>Generate Flight Briefing</Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
