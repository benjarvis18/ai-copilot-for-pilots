using Copilot4Pilots.Core.Dto;
using Flurl.Http;

namespace Copilot4Pilots.Core.Services;
public class WeatherService
{
  private readonly OpenAIService openAIService;
  private readonly string apiKey;

  public WeatherService(string apiKey, OpenAIServiceConnectionDetails openAIServiceConnectionDetails)
  {
    this.apiKey = apiKey;
    openAIService = new OpenAIService(openAIServiceConnectionDetails);
  }

  private IFlurlRequest CreateRequest() 
  {
    return "https://api.checkwx.com/".WithHeader("X-API-Key", apiKey);
  }

  public async Task<WeatherReport> GetWeatherReportAsync(string icaoCode)
  {
    var metar = await CreateRequest()
      .AppendPathSegment("metar")
      .AppendPathSegment(icaoCode)
      .AppendPathSegment("nearest")
      .GetJsonAsync();

    var taf = await CreateRequest()
      .AppendPathSegment("taf")
      .AppendPathSegment(icaoCode)
      .AppendPathSegment("nearest")
      .GetJsonAsync();

    var rawMetar = metar.data[0].ToString();
    var rawTaf = taf.data[0].ToString();

    var weatherSummary = await openAIService.GetWeatherSummaryAsync(rawMetar, rawTaf);

    return new WeatherReport(rawMetar, rawTaf, weatherSummary);    
  }
}
