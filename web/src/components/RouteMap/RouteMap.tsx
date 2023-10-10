import { Card } from '@mantine/core';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import './RouteMap.css';
import { AirfieldInformation } from '@/api';

export interface RouteMapProps {
  departureAirport: AirfieldInformation;
  arrivalAirport: AirfieldInformation;
}

export default function RouteMap(props: RouteMapProps) {
  return (
    <Card withBorder shadow="sm" padding="lg" radius="md" mih={400}>
      <MapContainer
        bounds={[
          [props.departureAirport.latitude - 1, props.departureAirport.longitude - 1],
          [props.arrivalAirport.latitude + 1, props.arrivalAirport.longitude + 1],
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          pathOptions={{ color: 'red' }}
          positions={[
            [props.departureAirport.latitude, props.departureAirport.longitude],
            [props.arrivalAirport.latitude, props.arrivalAirport.longitude],
          ]}
        />
        <Marker position={[props.departureAirport.latitude, props.departureAirport.longitude]}>
          <Popup>
            {props.departureAirport.name} ({props.departureAirport.icaoCode})
          </Popup>
        </Marker>
        <Marker position={[props.arrivalAirport.latitude, props.arrivalAirport.longitude]}>
          <Popup>
            {props.arrivalAirport.name} ({props.arrivalAirport.icaoCode})
          </Popup>
        </Marker>
      </MapContainer>
    </Card>
  );
}
