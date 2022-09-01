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
  loaded:boolean = false;
  demand: Demand = {} as Demand;
  total:number = 0;
  showTODMenu:boolean = false;
  showAddPlant:boolean = false;

  valMax:number = 0;
  nuke:number = 0;
  ng:number =0;
  coal:number = 0;
  hydro:number = 0;
  wind:number = 0;
  sun:number = 0;
  total2:number = 0;

  constructor(
    private eiaService: EiaServiceService,
    private sandboxService: SandboxService,
    private plantService: PlantService
  ) {}

//  bigFunction():any {
//    this.getAllPlants();
//    let i:number = 6;
//     //for (let i = 0; i < this.allPlants.length; i++) {
//       //console.log(this.allPlants[i].fuelId)
//       this.getPlantProps(this.allPlants[i].fuelId);
//       console.log(this.PP[i])

//       let TODDD: string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
//       let monthdate: string = this.TODStatus.season;

//        this.getActualCapacity(TODDD, this.TODStatus.region, this.PP[i].altCode);
//        console.log(this.Atotal);

//        this.getTotalNameplateCapacity(this.TODStatus.region, this.PP[i].fuelTypeCode, monthdate,);
//        console.log(this.Ntotal);

//        this.getDisplayCapacity(this.allPlants[i].id, this.Ntotal, this.Atotal);
//        this.displayCapacity;
//     //}
//   }

//   async getAllPlants(): Promise<any> {
//     return await this.sandboxService.GetAllPlants().subscribe(async (response: any) => {
//       this.allPlants = response;
//     });
//   }

//   async getPlantProps(fuelId: number): Promise<any> {
//     return await this.plantService.GetPlantProps(fuelId).subscribe(async (B: PlantProperties) => {
//       this.PP.push(B);
//     });
//   }

//   async getActualCapacity(TODDD: string, region: string, altCode: string): Promise<any> {
//     return await this.eiaService
//       .getActualCapacity(region, altCode, TODDD, TODDD)
//       .subscribe(async (A: any) => {
//         this.AC = A;
//         this.Atotal = 0;
//         for (let j = 0; j < this.AC.response.data.length; j++) {
//           this.Atotal += this.AC.response.data[j].value;
//         }
//         this.Atotal = Math.round(this.Atotal);
//         return await this.Atotal;
//       });
      
//   }

//   async getTotalNameplateCapacity(
//     region: string,
//     fuelTypeCode: string,
//     monthdate: string
//   ): Promise<any> {
//     return await this.eiaService
//       .getNameplateCapacity(region, fuelTypeCode, monthdate, monthdate)
//       .subscribe((C: Npc) => {
//         this.NPC = C;
//         this.Ntotal = 0;

//         for (let k = 0; k < this.NPC.response.data.length; k++) {
//           this.Ntotal += this.NPC.response.data[k]['nameplate-capacity-mw'];
//         }
//         this.Ntotal = Math.round(this.Ntotal);
//       });
//   }


//   async getDisplayCapacity(id:number, Ntotal:number, Atotal:number):Promise<any>{
//     return await this.sandboxService.ModifyCapacities(id, Ntotal, Atotal).subscribe((result:BuiltPlant) => {
//       let placehold:BuiltPlant = result;
//       this.displayCapacity = placehold.nameplateCapacity*(placehold.ac/placehold.npc);
//       console.log(this.displayCapacity);
//     })
//   }

// }

async ngOnInit() {
  this.getTOD({ time: 'T01', season: '2021-02', region: 'MISO' });
  // for (let i = 0; i < this.allPlants.length; i++) {
  //   this.checkPower(i);
  // }

   this.getDemand();

  this.getRatio2();
}

// setBars() {
  
//   document.getElementById("profBar").style.width = this.nuke.toString()+"%";
  
//   document.getElementById("offBar").style.width = this.ng.toString()+"%";
// }

//user sets new TOD
async getTOD(newTOD: TOD) {
  this.TODStatus = newTOD;
  this.getDemand();
  this.getRatio2();
  return this.TODStatus;
  //console.log(this.TODStatus.season)
}

getAllPlants():BuiltPlant[]{
  return this.allPlants
}

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

togglePower(id: number): any {
  let index = this.allPlants.findIndex(p => p.id == id)
  this.allPlants[index].powState = !this.allPlants[index].powState;
  console.log(id)
  console.log(index)
 
  this.checkPower(id);
  this.calculateTotal();
  this.calcProgressBar();
  console.log(this.allPlants[index])

  this.sandboxService.FlipPowState(id).subscribe((response: any) => {
    console.log(response.powState);
  });
  return this.allPlants[index].powState;
}



toggleTODMenu(){
  this.showTODMenu = !this.showTODMenu;
}

toggleAddPlant(){
  this.showAddPlant = !this.showAddPlant;
}

calcProgressBar(){
  this.valMax = this.demand.response.data[0].value * 0.01;
  this.nuke = (this.calcTotalByType(1)/this.valMax)*100;
  this.ng = (this.calcTotalByType(2)/this.valMax)*100;
  this.coal = (this.calcTotalByType(3)/this.valMax)*100
  this.hydro = (this.calcTotalByType(5)/this.valMax)*100
  this.wind = (this.calcTotalByType(6)/this.valMax)*100
  this.sun = (this.calcTotalByType(7)/this.valMax)*100
  //this.setBars();
}

calcTotalByType(fuelId:number):any{
  this.total2 = 0;
  this.allPlants.forEach((p:BuiltPlant) => {
    if(p.fuelId==fuelId){
      this.total2 += this.checkPower(p.id)  //returns check power for each plants
    }
  });  
  return this.total2;
}

checkPower(id: number): any {
  let index = this.allPlants.findIndex(p => p.id == id)
  //console.log(this.allPlants[index]);
  if (
  this.allPlants[index].powState == undefined){
    this.allPlants[index].powState = false
  }
  //should not happen
  // if (this.allPlants[index].ac == undefined){
  //   this.allPlants[index].ac = 0 
  //   console.log("got in here")
  // }
  // if(this.allPlants[index].npc == undefined){
  //   this.allPlants[index].npc = 1
  // }
  if (
    this.allPlants[index].powState == true &&
    this.allPlants[index].ac <= this.allPlants[index].npc)
   {
    return Math.round((this.allPlants[index].ac / this.allPlants[index].npc) * this.allPlants[index].nameplateCapacity) ;
  } 
  else if (
    this.allPlants[index].powState == true &&
    this.allPlants[index].ac > this.allPlants[index].npc
  ) {
    return this.allPlants[index].nameplateCapacity;
  } 
  else {
    return (0);
  }
}


getBuiltPlants(): any {
  this.sandboxService.GetAllPlants().subscribe((response: any) => {
    this.allPlants = response;
  });
}


async getDemand(): Promise<any> {
  let TODDD: string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
  await this.eiaService
    .getDemand(this.TODStatus.region, TODDD, TODDD)
    .subscribe((response: Demand) => {
      this.demand = response;
      //we are scaling this back quite a bit, so the user doesn't have to add 60 power plants lol 
      return this.demand;
    });
}


getTodddString(): string {
  return `${this.TODStatus.season}-28${this.TODStatus.time}`;
}




calculateTotal():any {
  this.total = 0;
  this.allPlants.forEach((p:BuiltPlant) => {
    
    this.total += this.checkPower(p.id)  //returns check power for each plants
  }); 
  //console.log(this.total) 
  return Math.round(this.total);
}

removePlant(id:number):any{
  let index = this.allPlants.findIndex(p => p.id == id)
  this.allPlants.splice(index, 1);
  this.sandboxService.DestroyAPlant(id).subscribe(
  );
}

newPlantAdmin():any{
  this.getTOD(this.TODStatus);
}

async getRatio2(): Promise<any> {
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

  await this.sandboxService.GetAllPlants().subscribe((response: any) => {
    this.allPlants = response;
    console.log(this.allPlants)
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
                    p.ac=placehold.ac;
                    p.npc = placehold.npc;
                  })
                });
            });
        });
    });
    
    return this.BOOOO;
    
  })}}

