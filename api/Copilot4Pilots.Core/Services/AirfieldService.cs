using Copilot4Pilots.Core.Dto;
using Microsoft.Azure.Cosmos;

namespace Copilot4Pilots.Core.Services;
public class AirfieldService
{
  private readonly CosmosDbConnectionDetails cosmosDbConnectionDetails;
  private readonly CosmosClient cosmosClient;
  private readonly Container cosmosContainer;  

  public AirfieldService(CosmosDbConnectionDetails cosmosDbConnectionDetails)
  {
    this.cosmosDbConnectionDetails = cosmosDbConnectionDetails;

    cosmosClient = new CosmosClient(
      cosmosDbConnectionDetails.ConnectionString,
      new CosmosClientOptions()
      {
        SerializerOptions = new()
        {
          PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase,
        }
      }
    );

    cosmosContainer = cosmosClient.GetContainer(cosmosDbConnectionDetails.DatabaseName, cosmosDbConnectionDetails.ContainerName);
  }

  public async Task InitialiseAsync()
  {
    await cosmosClient.CreateDatabaseIfNotExistsAsync(cosmosDbConnectionDetails.DatabaseName);
    await cosmosClient.GetDatabase(cosmosDbConnectionDetails.DatabaseName).CreateContainerIfNotExistsAsync(cosmosDbConnectionDetails.ContainerName, "/id");
  }

  public async Task<AirfieldInformation> GetAirfieldInformationAsync(string icaoCode)
  {
    return await cosmosContainer.ReadItemAsync<AirfieldInformation>(icaoCode, new PartitionKey(icaoCode));
  }

  public async Task CreateAirfieldInformationAsync(AirfieldInformation airfieldInformation)
  {
    await cosmosContainer.UpsertItemAsync(airfieldInformation, new PartitionKey(airfieldInformation.IcaoCode));
  }
}
