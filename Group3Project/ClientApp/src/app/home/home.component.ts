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
  BOOOO:number[] = [];

  ngOnInit() {
    this.getTOD({ time: 'T01', season: '2021-02', region: 'MISO' });
    for (let i = 0; i < this.allPlants.length; i++) {
      this.checkPower(i);
    }

    //get all built plants
    // this.sandboxService.GetAllPlants().subscribe((response: any) => {
    //   this.allPlants = response;
    //   this.TODStatus.region = 'MISO';
    //   this.TODStatus.season = '2021-02';
    //   this.TODStatus.time = 'T01';
    //   this.getDemand();
    // });
    //default time of day is midday, default season is summer, default region is AZPS
    //this gets demand for this time of day, in this region
    //   this.eiaService.getDemand("LDWP", "2021-08-28T20", "2021-08-28T20").subscribe((response:Demand) => {this.demand = response; console.log(this.demand)});
    //   //gets solar from LDWP -- tester
    //   this.eiaService.getNameplateCapacity("LDWP", "SUN", "2021-08", "2021-08" ).subscribe((response:Npc) =>{this.NPC = response;
    //   for(let i=0; i < this.NPC.response.data.length; i++){
    //     this.Ncapacities.push(this.NPC.response.data[i]['nameplate-capacity-mw']);
    //     this.Ntotal+=this.NPC.response.data[i]['nameplate-capacity-mw'];
    //   }
    // });
    //gets actual capacity from same time as tester ^^
    // this.eiaService.getActualCapacity("LDWP", "SUN", "2021-08-28T20", "2021-08-28T20" ).subscribe((response:ActualCapacity) => {this.AC = response;
    //    for(let i=0; i < this.AC.response.data.length; i++){
    //     //this.Acapacities.push(this.AC.response.data[i].value);
    //     //console.log(this.AC.response.data[i].value);
    //     this.Atotal+=this.AC.response.data[i].value;
    //  }
    // });
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

  //id = fuelId
  //not currently being used
  // getCodes(id: number): any {
  //   this.plantService
  //     .GetPlantProps(id)
  //     .subscribe((response: PlantProperties) => {
  //       response.FuelTypeCode = this.fuelTypeCode;
  //       response.AltCode = this.altCode;
  //     });
  // }

  // getRatio(): any {
  //   this.Ntotal = 0;
  //   this.Atotal = 0;
  //   this.Narray = [];
  //   this.Aarray = [];

  //   //let ratioArray:number[] = [];

  //   let TODDD: string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
  //   let monthdate: string = this.TODStatus.season;

  //   //getting the demand from the TOD changes.

  //   //getting the actual capacity for each fuel type
  //   console.log(this.PP[this.counter].altCode);
  //   this.eiaService
  //     .getActualCapacity(
  //       this.TODStatus.region,
  //       this.PP[this.counter].altCode,
  //       TODDD,
  //       TODDD
  //     )
  //     .subscribe((A: any) => {
  //       this.AC = A;
  //       this.Atotal = 0;
  //       for (let j = 0; j < this.AC.response.data.length; j++) {
  //         this.Atotal += this.AC.response.data[j].value;
  //       }
  //       this.Aarray.push(this.Atotal);
  //       console.log(this.Aarray);
  //     });

  //   this.eiaService
  //     .getNameplateCapacity(
  //       this.TODStatus.region,
  //       this.PP[this.counter].fuelTypeCode,
  //       monthdate,
  //       monthdate
  //     )
  //     .subscribe((response: Npc) => {
  //       this.NPC = response;
  //       this.Ntotal = 0;

  //       for (let k = 0; k < this.NPC.response.data.length; k++) {
  //         this.Ntotal += this.NPC.response.data[k]['nameplate-capacity-mw'];
  //       }
  //       this.Narray.push(this.Ntotal);
  //       console.log(this.Narray);
  //       // this.ratio = this.Atotal / this.Ntotal;
  //       // ratioArray.push(this.ratio);
  //       // //console.log(this.allPlants[num].powState);
  //       // this.netCapacity = this.allPlants[i].nameplateCapacity * this.ratio;
  //       // this.allActualCapacities.push(this.netCapacity);

  //       // // if (this.allPlants[num].powState == true) {
  //       // //   this.netCapacity.push(this.allPlants[num].nameplateCapacity * this.ratio);
  //       // // } else {
  //       // //   this.netCapacity.push(0);
  //       // // }
  //       // console.log(this.netCapacity);
  //     });
  //   return (this.counter += 1);
  // }
  // // return this.allActualCapacities;

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
    this.Atotal = 0;
    this.Narray = [];
    this.Aarray = [];
    this.allActualCapacities = [];
    this.PP = [];
    this.BOOOO = [];
    this.allPlants = [];

    this.counter += 1;
    console.log(this.counter);

    // Get all plants, using tap store that value locally to the component.
    this.sandboxService.GetAllPlants().pipe(tap((allPlants: BuiltPlant[]) => {
      this.allPlants = allPlants;
    }),
    // from takes items individually 'from' the array returned above.
    from,
    // pipe on the array to mergeMap into the next API call.
    mergeMap((plant: BuiltPlant) => {
      return this.plantService.GetPlantProps(plant.id)
    }), // mergeMap again for the next call...
     mergeMap((props: PlantProperties) => {
      this.PP.push(props);
      const TODDD = this.getTodddString();
      
      return this.eiaService.getActualCapacity(this.TODStatus.region, props.altCode, TODDD, TODDD)
    })).subscribe((res: any) => {
      console.log(res)
    });

    this.sandboxService.GetAllPlants().pipe(this.debug(), tap((allPlants: BuiltPlant[]) => {
      this.allPlants = allPlants;
    }))

      for (let i = 0; i < this.allPlants.length; i++) {
        console.log(this.allPlants[i].fuelId);

        this.plantService
          .GetPlantProps(this.allPlants[i].fuelId)
          .pipe(this.debug(),concatMap((plantProps: PlantProperties) => {
            this.PP.push(plantProps);
            let TODDD: string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
            let monthdate: string = this.TODStatus.season;

            return this.eiaService.getActualCapacity(this.TODStatus.region,
              this.PP[i].altCode,
              TODDD,
              TODDD
              )
          })),this.debug(), concatMap((actualCapacity: any) => {
            this.AC = actualCapacity;
            this.Atotal = 0;
            let monthdate: string = this.TODStatus.season;

            for (let j = 0; j < this.AC.response.data.length; j++) {
              this.Atotal += this.AC.response.data[j].value;
            }
            this.Atotal = Math.round(this.Atotal);
            this.Aarray.push(Math.round(this.Atotal));
            console.log(Math.round(this.Atotal));

            console.log(this.PP[i].fuelTypeCode);
            return this.eiaService
              .getNameplateCapacity(
                this.TODStatus.region,
                this.PP[i].fuelTypeCode,
                monthdate,
                monthdate
              )}
          ), this.debug(), concatMap((C: any) => {this.NPC = C;
                    
                    this.Ntotal = 0;

                    for (let k = 0; k < this.NPC.response.data.length; k++) {
                      //console.log(this.NPC.response.data[k]['nameplate-capacity-mw'])
                      this.Ntotal +=
                        this.NPC.response.data[k]['nameplate-capacity-mw'];
                    }
                    this.Ntotal = Math.round(this.Ntotal);
                    this.Narray.push(Math.round(this.Ntotal));
                    console.log(Math.round(this.Ntotal));

                    return this.sandboxService.ModifyCapacities(this.allPlants[i].id, this.Ntotal, this.Atotal).subscribe((result:BuiltPlant) => {
                      let placehold:BuiltPlant = result;
                      console.log(placehold);
                      this.BOOOO[i] = placehold.nameplateCapacity*(placehold.ac/placehold.npc);
                      console.log(placehold.nameplateCapacity*(placehold.ac/placehold.npc));
                    })
                  })
        }
  }
}