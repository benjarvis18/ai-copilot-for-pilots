namespace Copilot4Pilots.Core;
public class ApplicationConfiguration
{
  public CosmosDbConnectionDetails CosmosDbConnectionDetails { get; set; }
  public OpenAIServiceConnectionDetails OpenAIServiceConnectionDetails { get; set; }
  public string CheckWxApiKey { get; set; }
}
