import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PlantProperties } from './plant-properties';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient) { } 

  endpoint:string= "api/PlantProp"; 

  AddPlantProps(plant:PlantProperties):any {
    return this.http.post(`${this.baseUrl}${this.endpoint}/AddPlantProps`, plant);

  }

  GetPlanetProps(id:number):any {
    return this.http.get(`${this.baseUrl}${this.endpoint}/GetProps/${id}`);
  }


}
