namespace Copilot4Pilots.Core.Dto;
public class AirfieldBriefing : AirfieldInformation
{
  public WeatherReport WeatherReport { get; set; }

  public static AirfieldBriefing FromAirfieldInformation(AirfieldInformation airfieldInformation, WeatherReport weatherReport)
  {
    return new AirfieldBriefing() {
      IcaoCode = airfieldInformation.IcaoCode,
      Name = airfieldInformation.Name,
      ContactInformation = airfieldInformation.ContactInformation,
      Runways = airfieldInformation.Runways,
      Documents = airfieldInformation.Documents,
      Latitude = airfieldInformation.Latitude,
      Longitude = airfieldInformation.Longitude,
      WeatherReport = weatherReport
    };
  }
}