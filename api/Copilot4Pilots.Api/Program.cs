using Copilot4Pilots.Core;
using Copilot4Pilots.Core.Dto;
using Copilot4Pilots.Core.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

var configuration = builder.Configuration.GetSection("AppConfiguration").Get<ApplicationConfiguration>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/briefing/{departureIcaoCode}/{arrivalIcaoCode}", async (string departureIcaoCode, string arrivalIcaoCode) =>
{
    if (configuration == null) {
        return Results.Problem("AppConfiguration is null");
    }

    var airfieldService = new AirfieldService(configuration.CosmosDbConnectionDetails);

    var weatherService = new WeatherService(configuration.CheckWxApiKey, configuration.OpenAIServiceConnectionDetails);
    var openAIService = new OpenAIService(configuration.OpenAIServiceConnectionDetails);

    var departureAirfieldBriefing = AirfieldBriefing.FromAirfieldInformation(
        await airfieldService.GetAirfieldInformationAsync(departureIcaoCode), 
        await weatherService.GetWeatherReportAsync(departureIcaoCode)
    );

    var departureRunwaySelection = await openAIService.GetRunwaySelectionAsync(
        "take off",
        departureAirfieldBriefing.WeatherReport.RawMetar,
        departureAirfieldBriefing.Runways
    );

    departureAirfieldBriefing.Runways = departureRunwaySelection.Join(departureAirfieldBriefing.Runways, 
        runwaySelection => runwaySelection.Name, 
        runway => runway.Name, 
        (runwaySelection, runway) => runway with { 
            TakeoffDistance = runwaySelection.Distance,
            RunwaySuitabilityPercent = runwaySelection.RunwaySuitabilityPercent,
            RiskLevel = runwaySelection.RiskLevel            
        }
    ).ToList();

    var arrivalAirfieldBriefing = AirfieldBriefing.FromAirfieldInformation(
        await airfieldService.GetAirfieldInformationAsync(arrivalIcaoCode),
        await weatherService.GetWeatherReportAsync(arrivalIcaoCode)
    );

    var arrivalRunwaySelection = await openAIService.GetRunwaySelectionAsync(
        "landing",
        arrivalAirfieldBriefing.WeatherReport.RawMetar,
        arrivalAirfieldBriefing.Runways
    );

    arrivalAirfieldBriefing.Runways = arrivalRunwaySelection.Join(arrivalAirfieldBriefing.Runways,
        runwaySelection => runwaySelection.Name,
        runway => runway.Name,
        (runwaySelection, runway) => runway with
        {
            LandingDistance = runwaySelection.Distance,
            RunwaySuitabilityPercent = runwaySelection.RunwaySuitabilityPercent,
            RiskLevel = runwaySelection.RiskLevel
        }
    ).ToList();

    return Results.Ok(new FlightBriefing(
        $"Flight Briefing for {departureIcaoCode} to {arrivalIcaoCode}", 
        departureAirfieldBriefing, 
        arrivalAirfieldBriefing
    ));
})
.WithName("GetBriefing")
.WithOpenApi();

app.Run();