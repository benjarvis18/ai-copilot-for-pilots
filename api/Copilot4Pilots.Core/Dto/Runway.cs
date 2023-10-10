namespace Copilot4Pilots.Core.Dto;
public record class Runway(
  string Name,
  int Length,
  int Tora,
  int Lda,
  decimal? TakeoffDistance = null,
  decimal? LandingDistance = null,
  decimal? RunwaySuitabilityPercent = null,
  string? RiskLevel = null
)
{

}
