namespace Copilot4Pilots.Core.Dto;
public record FlightBriefing (
  string FlightDescription, 
  AirfieldBriefing DepartureBriefing, 
  AirfieldBriefing ArrivalBriefing
)
{

}
