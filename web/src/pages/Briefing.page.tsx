import AirfieldInformation from '../components/AirfieldInformation/AirfieldInformation';
import {
  Title,
  Text,
  Grid,
  Skeleton,
  rem,
  SimpleGrid,
  Stack,
  Loader,
  Card,
  Center,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { FlightBriefing, Api } from '../api';
import { useEffect, useState } from 'react';
import RouteMap from '../components/RouteMap/RouteMap';

export function Briefing() {
  const { departure, arrival } = useParams();

  const [flightBriefing, setFlightBriefing] = useState({} as FlightBriefing);
  const api = new Api();

  useEffect(() => {
    if (!departure || !arrival) return;

    api.getFlightBriefing(departure, arrival).then((flightBriefing) => {
      setFlightBriefing(flightBriefing);
    });
  }, [departure, arrival]);

  return (
    <>
      {flightBriefing.flightDescription ? (
        <Stack>
          <Title>{flightBriefing.flightDescription}</Title>
          <RouteMap departureAirport={flightBriefing.departureBriefing} arrivalAirport={flightBriefing.arrivalBriefing} />
          <SimpleGrid cols={2}>
            <AirfieldInformation type="Departure" data={flightBriefing.departureBriefing} />
            <AirfieldInformation type="Arrival" data={flightBriefing.arrivalBriefing} />
          </SimpleGrid>
        </Stack>
      ) : (
        <Center>
          <Stack>
            <Center>
              <Loader size={50} />
            </Center>
            <Text>Loading Briefing...</Text>
          </Stack>
        </Center>
      )}
    </>
  );
}
