namespace Copilot4Pilots.Core.Dto;

public class AirfieldInformation
{
  public string IcaoCode { get; set; }
  public string Name { get; set; }
  public ContactInformation ContactInformation { get; set; }
  public IEnumerable<Runway> Runways { get; set; }
  public IEnumerable<Document> Documents { get; set; }
  public decimal Latitude { get; set; }
  public decimal Longitude { get; set; }

  public string Id => IcaoCode;
}