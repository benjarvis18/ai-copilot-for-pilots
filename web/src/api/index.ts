export interface ContactInformation {
  emailAddress: string;
  phoneNumber: string;
  website: string;
}

export interface Runway {
  name: string;
  length: number;
  tora: number;
  lda: number;
  takeoffDistance: number;
  landingDistance: number;
  runwaySuitabilityPercent: number;
  riskLevel: string;
}

export interface WeatherReport {
  rawMetar: string;
  rawTaf: string;
  weatherSummary: string;
}

export interface Document {
  name: string;
  url: string;
}

export interface AirfieldInformation {
  icaoCode: string;
  name: string;
  contactInformation: ContactInformation;
  runways: Runway[];
  documents: Document[];
  latitude: number;
  longitude: number;
}

export interface AirfieldBriefing extends AirfieldInformation {
  weatherReport: WeatherReport;
}

export interface FlightBriefing {
  flightDescription: string;
  departureBriefing: AirfieldBriefing;
  arrivalBriefing: AirfieldBriefing;
}

export class Api {
  public async getFlightBriefing(departureIcaoCode: string, arrivalIcaoCode: string): Promise<FlightBriefing> {
    const response = await fetch(`/api/briefing/${departureIcaoCode}/${arrivalIcaoCode}`);
    return await response.json();
  }
}