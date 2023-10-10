using System.Text;
using System.Text.Json;
using Copilot4Pilots.Core.Dto;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using Microsoft.SemanticKernel.Orchestration;
using Microsoft.SemanticKernel.SemanticFunctions;
using Microsoft.SemanticKernel.SkillDefinition;
using Microsoft.SemanticKernel.Skills.Core;

namespace Copilot4Pilots.Core.Services;
public class OpenAIService
{
  private readonly IKernel semanticKernel;
  private readonly ISKFunction summarizeWeather;
  private readonly ISKFunction selectRunway;

  public OpenAIService(OpenAIServiceConnectionDetails connectionDetails)
  {
    semanticKernel = GetSemanticKernel(connectionDetails);

    summarizeWeather = CreateSummarizeWeatherFunction();
    selectRunway = CreateSelectRunwayFunction();
  }

  private static IKernel GetSemanticKernel(OpenAIServiceConnectionDetails connectionDetails) 
  {
    var builder = new KernelBuilder();

    builder.WithAzureChatCompletionService(
      connectionDetails.DeploymentName,  // Azure OpenAI Deployment Name
      connectionDetails.Endpoint,        // Azure OpenAI Endpoint
      connectionDetails.Key              // Azure OpenAI Key
    );

    return builder.Build();
  }

  private ISKFunction CreateSummarizeWeatherFunction() 
  {
    var prompt = @"Given the following METAR and TAF: 
    
    --Begin METAR--
    {{$METAR}}
    --End METAR--

    --Begin TAF--
    {{$TAF}}
    --End TAF--
    
    Provide a maximum 2 line summary that includes suitability for VFR flying, the impact of winds/turbulence on comfort/safety and a summary of current and future conditions.
    
    Use <span style=""color:red""> to highlight any potentially negative aspects of the summary.";

    return semanticKernel.CreateSemanticFunction(prompt);
  }  

  private ISKFunction CreateSelectRunwayFunction() 
  {
    var prompt = @"Given the following METAR:   

    --Begin METAR--  
    {{$METAR}}
    --End METAR--

    And the following runway information:

    --Begin Runway Information--
    {{$RUNWAYINFORMATION}}
    --End Runway Information--

    With the following definitions:
    * name: the runway number
    * length: the total length of runway(in meters)
    * tora: take off run available(in meters)
    * lda: landing distance available(in meters)

    And given that I am flying a Piper PA28-161 Warrior at Maximum Take Off Weight

    Select the best runway for {{$TYPE}} and then return a JSON array containing each input runway with the following attributes:

    * Name: the runway number
    * Distance: the estimated {{$TYPE}} distance required
    * RunwaySuitabilityPercent: the percentage suitability of the runway based on wind conditions, {{$TYPE}} distance and overall risk
    * RiskLevel: an indicator with possible values low, medium and high indicating the overall risk of using the runway

    Only return a JSON array. Do not return anything other than JSON. 
    
    Do not return any narrative or calculations.
    
    The json array:";

    return semanticKernel.CreateSemanticFunction(prompt, new PromptTemplateConfig() {
      Completion = new PromptTemplateConfig.CompletionConfig() {
        Temperature = 0.2,
        TopP = 0.95,
        MaxTokens = 800,
        FrequencyPenalty = 0,
        PresencePenalty = 0        
      }
    });
  }

  public async Task<string> GetWeatherSummaryAsync(string rawMetar, string rawTaf) 
  {
    var functionVariables = new ContextVariables();
    functionVariables.Set("METAR", rawMetar);
    functionVariables.Set("TAF", rawTaf);

    var result = await summarizeWeather.InvokeAsync(functionVariables);
    return result.Result;
  }

  public async Task<IEnumerable<RunwaySelection>> GetRunwaySelectionAsync(string type, string rawMetar, IEnumerable<Runway> runways)
  {
    var functionVariables = new ContextVariables();
    functionVariables.Set("TYPE", type);
    functionVariables.Set("METAR", rawMetar);
    functionVariables.Set("RUNWAYINFORMATION", JsonSerializer.Serialize(runways));

    var result = await selectRunway.InvokeAsync(functionVariables);
    return JsonSerializer.Deserialize<IEnumerable<RunwaySelection>>(result.Result) ?? new List<RunwaySelection>();
  }
}
