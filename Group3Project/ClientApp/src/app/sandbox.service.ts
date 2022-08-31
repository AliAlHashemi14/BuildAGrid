import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BuiltPlant } from './built-plant';
import { PlantProperties } from './plant-properties';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {

  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient) { } 

  endpoint:string= "api/BuiltPlant"; 

  AddAPlant(fuelId:number, nameplateCapacity:number):any {
    return this.http.post(`${this.baseUrl}${this.endpoint}/AddAPlant?fuelId=${fuelId}&nameplateCapacity=${nameplateCapacity}`, {});
  }

  DestroyAPlant(Id:number):any {
    return this.http.delete(`${this.baseUrl}${this.endpoint}/DestroyAPlant?Id=${Id}`, {});
  }

  GetAllPlants():any{
    return this.http.get(`${this.baseUrl}${this.endpoint}/GetAllPlants`);
  }

  ModifyCapacities(Id:number, NPC:number, AC:number):any{
    return this.http.patch(`${this.baseUrl}${this.endpoint}/ModifyCapacities/${Id}?Npc=${NPC}&Ac=${AC}`, {});
  }

  FlipPowState(Id:number):any {
    return this.http.patch(`${this.baseUrl}${this.endpoint}/FlipPowState?Id=${Id}`, {});
  }

}
