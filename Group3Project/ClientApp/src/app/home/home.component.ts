import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
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
import { concatMap, tap, mergeMap, map } from 'rxjs/operators'
import { Observable, from, pipe } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private eiaService: EiaServiceService,
    private sandboxService: SandboxService,
    private plantService: PlantService
  ) {}

  //Demand object stores a lot of demand data.
  demand: Demand = {} as Demand;
  NPC: Npc = {} as Npc;
  AC: ActualCapacity = {} as ActualCapacity;
  Narray: number[] = [];
  Aarray: number[] = [];
  // Atotal: number = 0;
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
  BOOOO:number[] = [];
  loaded:boolean = false;

  ngOnInit() {
    this.getTOD({ time: 'T01', season: '2021-02', region: 'MISO' });
    for (let i = 0; i < this.allPlants.length; i++) {
      this.checkPower(i);
    }
  }

  //user sets new TOD
  getTOD(newTOD: TOD) {
    this.TODStatus = newTOD;
    return this.TODStatus;
    //console.log(this.TODStatus.season)
  }

  togglePower(id: number): any {
    id -= 3;
    this.allPlants[id].powState = !this.allPlants[id].powState;
    this.checkPower(id);
    return this.allPlants[id].powState;
  }

  checkPower(id: number): any {
    id -= 3;
    if (
      this.allPlants[id].powState == true &&
      this.allActualCapacities[id] <= this.allPlants[id].nameplateCapacity
    ) {
      return (this.BOOOO[id] = this.allActualCapacities[id]);
    } else if (
      this.allPlants[id].powState == true &&
      this.allActualCapacities[id] > this.allPlants[id].nameplateCapacity
    ) {
      return (this.BOOOO[id] = this.allPlants[id].nameplateCapacity);
    } else {
      return (this.BOOOO[id] = 0);
    }
  }

  getBuiltPlants(): any {
    this.sandboxService.GetAllPlants().subscribe((response: any) => {
      this.allPlants = response;
    });
  }

  getDemand(): any {
    let TODDD: string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
    this.eiaService
      .getDemand(this.TODStatus.region, TODDD, TODDD)
      .subscribe((response: Demand) => {
        this.demand = response;
        return this.demand;
      });
  }

  holyFuck(): any {
    console.log(this.Aarray);
    console.log(this.Narray);
    for (let i = 0; i < this.Narray.length; i++) {
      //console.log(this.ratios);

      this.allActualCapacities.push(
        (this.Aarray[i] / this.Narray[i]) * this.allPlants[i].nameplateCapacity
      );
    }
    console.log(this.allActualCapacities)
    return this.allActualCapacities;
  }

  
  debug() {
    return tap(data => {
      console.log(data);
    })
  }

  getTodddString(): string {
    return `${this.TODStatus.season}-28${this.TODStatus.time}`;
  }

  getRatio2(): any {
    this.Ntotal = 0;
    let Atotal = 0;
    this.Narray = [];
    this.Aarray = [];
    this.allActualCapacities = [];
    this.PP = [];
    this.BOOOO = [];
    this.loaded =false;

    this.counter += 1;
    console.log(this.counter);

    this.sandboxService.GetAllPlants().subscribe((response: any) => {
      this.allPlants = response;

      this.allPlants.forEach((p:BuiltPlant) => {
        console.log(p.fuelId);

        this.plantService
          .GetPlantProps(p.fuelId)
          .subscribe((B: PlantProperties) => {
            this.PP.push(B);
            //console.log(this.PP);

            let TODDD: string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
            let monthdate: string = this.TODStatus.season;

            console.log(B.altCode)
            this.eiaService
              .getActualCapacity(
                this.TODStatus.region,
                B.altCode,
                TODDD,
                TODDD
              )
              .subscribe((A: any) => {
                
                this.eiaService
                  .getNameplateCapacity(
                    this.TODStatus.region,
                    B.fuelTypeCode,
                    monthdate,
                    monthdate
                  )
                  .subscribe((C: Npc) => {
                    this.AC = A;
                  Atotal = 0;
                  // for (let j = 0; j < this.AC.response.data.length; j++) {
                  //   this.Atotal += this.AC.response.data[j].value; //Atotal assigned here. Why is it not getting passed right 
                  // }
                  this.AC.response.data.forEach((n => Atotal += n.value))
                  console.log(`ATOTAL: ${Atotal}`);
                  Atotal = Math.round(Atotal);
                  this.Aarray.push(Math.round(Atotal));
                  // console.log(Math.round(Atotal));

                  console.log(B.fuelTypeCode);
                    this.NPC = C;
                    this.Ntotal = 0;

                    for (let k = 0; k < this.NPC.response.data.length; k++) {
                      //console.log(this.NPC.response.data[k]['nameplate-capacity-mw'])
                      this.Ntotal +=
                        this.NPC.response.data[k]['nameplate-capacity-mw'];
                    }
                    this.Ntotal = Math.round(this.Ntotal);
                    this.Narray.push(Math.round(this.Ntotal));
                    console.log(Math.round(this.Ntotal));

                    this.sandboxService.ModifyCapacities(p.id, this.Ntotal, Atotal).subscribe((result:BuiltPlant) => {
                      let placehold:BuiltPlant = result;
                      console.log(placehold);
                      this.BOOOO.push(placehold.nameplateCapacity*(placehold.ac/placehold.npc));
                      console.log((placehold.ac/placehold.npc));
                      this.loaded = true;
                    })
                  });
              });
          });
      });
      
      return this.BOOOO;
      
    })}}

  