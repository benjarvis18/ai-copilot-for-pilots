# Prompt 1

Given the following METAR and TAF: 

--Begin METAR--
EGLF 011720Z 20007KT 9999 FEW026 19/16 Q1019
--End METAR--

--Begin TAF--
TAF EGLF 011356Z 0115/0119 22009KT 9999 SCT020
--End TAF--

Provide a maximum 2 line summary that includes suitability for VFR flying, the impact of winds/turbulence on comfort/safety and a summary of current and future conditions.

Use <span style=""color:red""> to highlight any potentially negative aspects of the summary.

# Prompt 2

Given the following METAR:   

--Begin METAR--  
EGLF 011720Z 20007KT 9999 FEW026 19/16 Q1019
--End METAR--

And the following runway information:

--Begin Runway Information--
[
  {
      "name": "07",
      "length": 1335,
      "tora": 1199,
      "lda": 1102,
      "takeoffDistance": null,
      "landingDistance": null,
      "runwaySuitabilityPercent": null,
      "riskLevel": null
  },
  {
      "name": "25",
      "length": 1335,
      "tora": 1195,
      "lda": 1059,
      "takeoffDistance": null,
      "landingDistance": null,
      "runwaySuitabilityPercent": null,
      "riskLevel": null
  }
]
--End Runway Information--

With the following definitions:
* name: the runway number
* length: the total length of runway(in meters)
* tora: take off run available(in meters)
* lda: landing distance available(in meters)

And given that I am flying a Piper PA28-161 Warrior at Maximum Take Off Weight

Select the best runway for landing and then return a JSON array containing each input runway with the following attributes:

* Name: the runway number
* Distance: the estimated landing distance required
* RunwaySuitabilityPercent: the percentage suitability of the runway based on wind conditions, landing distance and overall risk
* RiskLevel: an indicator with possible values low, medium and high indicating the overall risk of using the runway

Only return a JSON array. Do not return anything other than JSON. 

Do not return any narrative or calculations.

The json array:


# Prompt 2 - Explanation

Given the following METAR:     
  
--Begin METAR--    
EGLF 011720Z 20007KT 9999 FEW026 19/16 Q1019  
--End METAR--  

And the following runway information:  

--Begin Runway Information--  
[  
  {  
      "name": "07",  
      "length": 1335,  
      "tora": 1199,  
      "lda": 1102,  
      "takeoffDistance": null,  
      "landingDistance": null,  
      "runwaySuitabilityPercent": null,  
      "riskLevel": null  
  },  
  {  
      "name": "25",  
      "length": 1335,  
      "tora": 1195,  
      "lda": 1059,  
      "takeoffDistance": null,  
      "landingDistance": null,  
      "runwaySuitabilityPercent": null,  
      "riskLevel": null  
  }  
]  
--End Runway Information--  

With the following definitions:  
* name: the runway number  
* length: the total length of runway(in meters)  
* tora: take off run available(in meters)  
* lda: landing distance available(in meters)  

And given that I am flying a Piper PA28-161 Warrior at Maximum Take Off Weight  

Select the best runway for landing based on wind direction and length, then return a JSON array containing each input runway with the following attributes:  
* Name: the runway number  
* Distance: the estimated landing distance required for the aircraft 
* RunwaySuitabilityPercent: the percentage suitability of the runway based on wind conditions, landing distance and overall risk  
* RiskLevel: an indicator with possible values low, medium and high indicating the overall risk of using the runway

# Prompt 2 - Distance Explanation

Explain how the landing distance was calculated

# Prompt 3 

Using the document content provide a summary of the VFR departure procedures for EGLK. Focus specifically on traffic departing to the west. Include relevant information around noise abatement. Return a short TLDR  
