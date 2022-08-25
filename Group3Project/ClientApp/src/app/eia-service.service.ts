import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root'
})
export class EiaServiceService {

  constructor(private http:HttpClient) { }

  //gets demand for particular region for 2021
  //format for hour is YYYY-MM-DDTHH
  getDemand(regionCode:string, start:string, end:string):any{
    return this.http.get(`https://api.eia.gov/v2/electricity/rto/region-data/data/?api_key=${Secret.API_key}&frequency=hourly&facets[type][]=D&facets[respondent][]=${regionCode}&data[]=value&start=${start}&end=${end}`)
  }

  //format is YYYY-MM
  getNameplateCapacity(regionCode:string, energySourceCode:string, start:string, end:string):any{
    return this.http.get(`https://api.eia.gov/v2/electricity/operating-generator-capacity/data/?api_key=${Secret.API_key}&facets[balancing_authority_code][]=${regionCode}&data[]=nameplate-capacity-mw&facets[energy_source_code][]=${energySourceCode}&start=${start}&end=${end}`)
  }

  //format for hour is YYYY-MM-DDTHH
  getActualCapacity(regionCode:string, energySourceCode:string, start:string, end:string):any{
    return this.http.get(`https://api.eia.gov/v2/electricity/rto/fuel-type-data/data/?api_key=${Secret.API_key}&facets[respondent][]=${regionCode}&facets[fueltype][]=${energySourceCode}&data[]=value&start=${start}&end=${end}`)
  }
}
