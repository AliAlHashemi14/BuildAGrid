import { Component, OnInit } from '@angular/core';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { waitForAsync } from '@angular/core/testing';
import { ActualCapacity } from '../actual-capacity';
import { BuiltPlant } from '../built-plant';
import { Demand } from '../demand';
import { EiaServiceService } from '../eia-service.service';
import { Npc } from '../npc';
import { PlantProperties } from '../plant-properties';
import { PlantService } from '../plant.service';
import { SandboxService } from '../sandbox.service';
import { TOD } from '../tod';
import { concatMap, tap, mergeMap, map } from 'rxjs/operators';
import { Observable, from, pipe } from 'rxjs';

@Component({
  selector: 'app-calculate-capacity',
  templateUrl: './calculate-capacity.component.html',
  styleUrls: ['./calculate-capacity.component.css'],
})
export class CalculateCapacityComponent implements OnInit {
  NPC: Npc = {} as Npc;
  AC: ActualCapacity = {} as ActualCapacity;
  Narray: number[] = [];
  Aarray: number[] = [];
  Atotal: number = 0;
  Ntotal: number = 0;
  allPlants: BuiltPlant[] = [];
  TODStatus: TOD = {} as TOD;
  ratios: number[] = [];
  PP: PlantProperties[] = [];
  allActualCapacities: number[] = [];
  netCapacity: number = {} as number;
  numberInAC: number = -1;
  counter: number = -1;
  offCapacity: number = 0;
  num: number = 0;
  BOOOO: number[] = [];
  displayCapacity:number = {} as number;

  constructor(
    private eiaService: EiaServiceService,
    private sandboxService: SandboxService,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {}

  getTOD(newTOD: TOD) {
    this.TODStatus = newTOD;
    return this.TODStatus;
    //console.log(this.TODStatus.season)
  }

 bigFunction():any {
   this.getAllPlants();
   let i:number = 6;
    //for (let i = 0; i < this.allPlants.length; i++) {
      //console.log(this.allPlants[i].fuelId)
      this.getPlantProps(this.allPlants[i].fuelId);
      console.log(this.PP[i])

      let TODDD: string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
      let monthdate: string = this.TODStatus.season;

       this.getActualCapacity(TODDD, this.TODStatus.region, this.PP[i].altCode);
       console.log(this.Atotal);

       this.getTotalNameplateCapacity(this.TODStatus.region, this.PP[i].fuelTypeCode, monthdate,);
       console.log(this.Ntotal);

       this.getDisplayCapacity(this.allPlants[i].id, this.Ntotal, this.Atotal);
       this.displayCapacity;
    //}
  }

  async getAllPlants(): Promise<any> {
    return await this.sandboxService.GetAllPlants().subscribe(async (response: any) => {
      this.allPlants = response;
    });
  }

  async getPlantProps(fuelId: number): Promise<any> {
    return await this.plantService.GetPlantProps(fuelId).subscribe(async (B: PlantProperties) => {
      this.PP.push(B);
    });
  }

  async getActualCapacity(TODDD: string, region: string, altCode: string): Promise<any> {
    return await this.eiaService
      .getActualCapacity(region, altCode, TODDD, TODDD)
      .subscribe(async (A: any) => {
        this.AC = A;
        this.Atotal = 0;
        for (let j = 0; j < this.AC.response.data.length; j++) {
          this.Atotal += this.AC.response.data[j].value;
        }
        this.Atotal = Math.round(this.Atotal);
        return await this.Atotal;
      });
      
  }

  async getTotalNameplateCapacity(
    region: string,
    fuelTypeCode: string,
    monthdate: string
  ): Promise<any> {
    return await this.eiaService
      .getNameplateCapacity(region, fuelTypeCode, monthdate, monthdate)
      .subscribe((C: Npc) => {
        this.NPC = C;
        this.Ntotal = 0;

        for (let k = 0; k < this.NPC.response.data.length; k++) {
          this.Ntotal += this.NPC.response.data[k]['nameplate-capacity-mw'];
        }
        this.Ntotal = Math.round(this.Ntotal);
      });
  }


  async getDisplayCapacity(id:number, Ntotal:number, Atotal:number):Promise<any>{
    return await this.sandboxService.ModifyCapacities(id, Ntotal, Atotal).subscribe((result:BuiltPlant) => {
      let placehold:BuiltPlant = result;
      this.displayCapacity = placehold.nameplateCapacity*(placehold.ac/placehold.npc);
      console.log(this.displayCapacity);
    })
  }

}
