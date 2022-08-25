import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BuiltPlant } from './built-plant';
import { Plant } from './plant';

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

}