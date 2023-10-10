using Copilot4Pilots.Core;
using Copilot4Pilots.Core.Dto;
using Copilot4Pilots.Core.Services;

Console.WriteLine("Copilot4Pilots Seed Application");

var cosmosConnectionDetails = new CosmosDbConnectionDetails(
  "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==", 
  "Copilot4Pilots", 
  "Airfield"
);

var airfieldService = new AirfieldService(cosmosConnectionDetails);

await airfieldService.InitialiseAsync();

// EGLK - Blackbushe Airport
Console.WriteLine("Creating Airfield Record for EGLK");

var airfieldInformation = new AirfieldInformation() 
{
  IcaoCode = "EGLK",
  Name = "Blackbushe Airport",
  ContactInformation = new ContactInformation("01234567890", "info@blackbusheairport.com", "https://www.blackbusheairport.com"),
  Runways = new List<Runway>() 
  { 
    new Runway("07", 1335, 1199, 1102), 
    new Runway("25", 1335, 1195, 1059) 
  },
  Documents = new List<Document>() 
  { 
    new Document("Rules and Procedures", "https://static1.squarespace.com/static/593e87342e69cf4a3e148bb4/t/64a55aa2628dff5747a0367e/1688558247776/2023.03.02+-+Rules+%26+Procedures+V8.pdf"),
    new Document("AIP Entry", "https://static1.squarespace.com/static/593e87342e69cf4a3e148bb4/t/647f0ce0a09b53616e2e2f6e/1686047969809/2023.07.13+-+Blackbushe+AIP+Entry.pdf"),
    new Document("Aerodrome Chart", "https://nats-uk.ead-it.com/cms-nats/export/sites/default/en/Publications/AIP/Current-AIRAC/graphics/233930.pdf")
  },
  Latitude = 51.323611m,
  Longitude = -0.847222m
};

await airfieldService.CreateAirfieldInformationAsync(airfieldInformation);

// LFAT - Le Touquet - Côte d'Opale Airport
Console.WriteLine("Creating Airfield Record for LFAT");

airfieldInformation = new AirfieldInformation()
{
  IcaoCode = "LFAT",
  Name = "Le Touquet - Côte d'Opale Airport",
  ContactInformation = new ContactInformation("01234567890", "info@letouquetairport.com", "https://www.letouquetairport.com"),
  Runways = new List<Runway>() 
  { 
    new Runway("13", 1850, 1700, 1700), 
    new Runway("31", 1850, 1850, 1700) 
  },
  Documents = new List<Document>() 
  { 
    new Document("Aerodrome Chart", "https://www.letouquetairport.com/aerodrome-chart.pdf") 
  },
  Latitude = 50.517222m,
  Longitude = 1.620556m
};

await airfieldService.CreateAirfieldInformationAsync(airfieldInformation);

// EGHN - Sandown Airport
Console.WriteLine("Creating Airfield Record for EGHN");

airfieldInformation = new AirfieldInformation()
{
  IcaoCode = "EGHN",
  Name = "Sandown Airport",
  ContactInformation = new ContactInformation("01234567890", "info@sandownairport.com", "https://www.sandownairport.com"),
  Runways = new List<Runway>() 
  { 
    new Runway("05", 884, 884, 775), 
    new Runway("23", 884, 884, 884) 
  },
  Documents = new List<Document>() 
  { 
    new Document("Aerodrome Chart", "https://www.sandownairport.com/aerodrome-chart.pdf") 
  },
  Latitude = 50.654167m,
  Longitude = -1.107778m
};

await airfieldService.CreateAirfieldInformationAsync(airfieldInformation);