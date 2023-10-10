dotnet user-secrets init

dotnet user-secrets set "AppConfiguration:CheckWxApiKey" ""

dotnet user-secrets set "AppConfiguration:CosmosDbConnectionDetails:ConnectionString" ""
dotnet user-secrets set "AppConfiguration:CosmosDbConnectionDetails:DatabaseName" ""
dotnet user-secrets set "AppConfiguration:CosmosDbConnectionDetails:ContainerName" ""

dotnet user-secrets set "AppConfiguration:OpenAIServiceConnectionDetails:Endpoint" ""
dotnet user-secrets set "AppConfiguration:OpenAIServiceConnectionDetails:Key" ""
dotnet user-secrets set "AppConfiguration:OpenAIServiceConnectionDetails:DeploymentName" ""