import { Runway } from '@/api';
import { Card, Group, RingProgress, Stack, Text } from '@mantine/core';
import { IconRoad } from '@tabler/icons-react';

interface RunwayLengthProps {
  measure: string;
  value: number;
}

function RunwayLength(props: RunwayLengthProps) {
  return (
    <Group>
      <Text size="xs" fw={500}>
        {props.measure}:
      </Text>
      <Text size="xs">{props.value}m</Text>
    </Group>
  );
}

interface RunwayProps {
  runway: Runway;
}

function RunwayInformation(props: RunwayProps) {
  const useAI = import.meta.env.VITE_USE_AI == "true";

  const getColor = () => {
    switch (props.runway.riskLevel) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'grey';
    }
  };

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group>
          <IconRoad />
          <Text size="md" fw={500}>
            {props.runway.name}
          </Text>

          <RunwayLength measure="Length" value={props.runway.length} />
          <RunwayLength measure="TORA" value={props.runway.tora} />
          <RunwayLength measure="LDA" value={props.runway.lda} />

          {useAI && (
            <Group>
              <Text size="xs" fw={500}>
                Suitability:
              </Text>
              <RingProgress
                sections={[{ value: props.runway.runwaySuitabilityPercent, color: getColor() }]}
                size={50}
                thickness={5}
                label={
                  <Text c={getColor()} fw={600} ta="center" size="xs">
                    {Math.round(props.runway.runwaySuitabilityPercent)}%
                  </Text>
                }
              />
            </Group>
          )}
        </Group>
      </Card.Section>
    </Card>
  );
}

interface RunwayDisplayProps {
  runways: Runway[];
}

export default function RunwayDisplay(props: RunwayDisplayProps) {
  const runways = props.runways.map((runway) => <RunwayInformation runway={runway} />);

  return <Stack>{runways}</Stack>;
}
