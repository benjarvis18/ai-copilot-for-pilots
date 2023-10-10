import {
  Card,
  Group,
  Title,
  Text,
  Badge,
  Progress,
  Avatar,
  ActionIcon,
  Stack,
} from '@mantine/core';
import {
  IconAt,
  IconFile,
  IconPhone,
  IconPlaneArrival,
  IconPlaneDeparture,
  IconUpload,
  IconWorldWww,
} from '@tabler/icons-react';
import DocumentBadge from '../DocumentBadge/DocumentBadge';
import RunwayDisplay from '../RunwayDisplay/RunwayDisplay';
import { AirfieldBriefing } from '@/api';
import AISwitch from '../AISwitch/AISwitch';
import { useState } from 'react';

interface AirfieldInformationProps {
  height?: string | number;
  type: 'Departure' | 'Arrival';
  data: AirfieldBriefing;
}

export default function AirfieldInformation(props: AirfieldInformationProps) {
  const icon =
    props.type === 'Departure' ? <IconPlaneDeparture size="40" /> : <IconPlaneArrival size="40" />;

  const documents = props.data.documents.map((document) => (
    <DocumentBadge documentName={document.name} documentUrl={document.url} />
  ));

  const useAI = import.meta.env.VITE_USE_AI == "true";
  const [enableAIWeather, setEnableAIWeather] = useState(true);

  return (
    <>
      <Card withBorder shadow="sm" padding="lg" radius="md" mih={props.height}>
        <Group>
          {icon}
          <Text fz="xl" fw={500}>
            {props.type} Information - {props.data.name} ({props.data.icaoCode})
          </Text>
        </Group>

        <Stack mt="md">
          <Text fz="lg" fw={500}>
            General Information
          </Text>
          <Stack>
            <Group wrap="nowrap" gap={10} mt={3}>
              <IconAt stroke={1.5} size="1.5rem" />
              <a href={'mailto:' + props.data.contactInformation.emailAddress}>
                <Text>{props.data.contactInformation.emailAddress}</Text>
              </a>
            </Group>
            <Group wrap="nowrap" gap={10} mt={3}>
              <IconPhone stroke={1.5} size="1.5rem" />
              <Text>{props.data.contactInformation.phoneNumber}</Text>
            </Group>
            <Group wrap="nowrap" gap={10} mt={3}>
              <IconWorldWww stroke={1.5} size="1.5rem" />
              <a href={props.data.contactInformation.website} target="_blank" rel="noreferrer">
                <Text>{props.data.contactInformation.website}</Text>
              </a>
            </Group>
          </Stack>
        </Stack>

        <Stack mt="md">
          <Text fz="lg" fw={500}>
            Runways
          </Text>

          <RunwayDisplay runways={props.data.runways} />
        </Stack>

        <Stack mt="md">
          <Group>
            <Text fz="lg" fw={500}>
              Weather
            </Text>
            {useAI && (
              <AISwitch
                checked={enableAIWeather}
                onSwitch={(checked) => setEnableAIWeather(checked)}
              />
            )}
          </Group>
          {useAI && enableAIWeather ? (
            <Text
              dangerouslySetInnerHTML={{ __html: props.data.weatherReport.weatherSummary }}
            ></Text>
          ) : (
            <>
              <Text>{props.data.weatherReport.rawMetar}</Text>
              <Text>{props.data.weatherReport.rawTaf}</Text>
            </>
          )}
        </Stack>

        <Stack mt="md">
          <Text fz="lg" fw={500}>
            Procedures
          </Text>
          <Group>{documents}</Group>
        </Stack>
      </Card>
    </>
  );
}
