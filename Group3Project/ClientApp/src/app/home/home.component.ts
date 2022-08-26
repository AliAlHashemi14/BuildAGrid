import { Component } from '@angular/core';
import { ActualCapacity } from '../actual-capacity';
import { BuiltPlant } from '../built-plant';
import { Demand } from '../demand';
import { EiaServiceService } from '../eia-service.service';
import { Npc } from '../npc';
import { PlantProperties } from '../plant-properties';
import { PlantService } from '../plant.service';
import { SandboxService } from '../sandbox.service';
import { TOD } from '../tod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {


  constructor (private eiaService:EiaServiceService, private sandboxService:SandboxService, private plantService:PlantService) {};

  //Demand object stores a lot of demand data.
  demand:Demand = {} as Demand;
  NPC:Npc = {} as Npc;
  AC:ActualCapacity = {} as ActualCapacity;
  //Ncapacities:number[] = [];
  //Acapacities:number[] = [];
  Atotal:number = 0;
  Ntotal:number = 0;
  allPlants:BuiltPlant[] = [];
  TODStatus:TOD = {} as TOD;
  ratio:number = 0;
  fuelTypeCode:string = "NUC";
  altCode:string = "NUC";

  ngOnInit(){
    //get all built plants
    this.sandboxService.GetAllPlants().subscribe((response:any) => {this.allPlants = response})

    
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
  getTOD(newTOD:TOD){
    this.TODStatus = newTOD;
    console.log(this.TODStatus.season)
  }

  getBuiltPlants():any{
    this.sandboxService.GetAllPlants().subscribe((response:any) => {this.allPlants = response})

  }

//id = fuelId 
//not currently being used 
  getCodes(id:number):any{  
    
    this.plantService.GetPlantProps(id).subscribe((response:PlantProperties) => {
     response.FuelTypeCode = this.fuelTypeCode;
     response.AltCode = this.altCode;
    })
  }

  getRatio():any{
     //default time of day is midday, default season is summer, default region is AZPS 
     //datetime and monthdate are set by user when TOD is adjuted <3 
     

     //remove later
    //  this.plantService.GetPlantProps(1).subscribe((response:PlantProperties) => {
    //   this.fuelTypeCode=response.FuelTypeCode;
    //   this.altCode=response.AltCode;
    // });


    let TODDD:string = `${this.TODStatus.season}-28${this.TODStatus.time}`;
    let monthdate:string = this.TODStatus.season;
    //let monthdate:string = "2021-08";
     console.log(TODDD);

     //getting the demand from the TOD changes. 
     this.eiaService.getDemand(this.TODStatus.region, TODDD, TODDD).subscribe((response:Demand) => {this.demand = response}); 

     // this can be done OnInit for all fuel types and save into an [], rather than call it each time... 
     // fuelTypeCode passed around a bit - just getting NPC for this fuel type, in this region, so we can use it to compare 

     this.eiaService.getNameplateCapacity(this.TODStatus.region, this.fuelTypeCode, monthdate, monthdate).subscribe((response:Npc) =>{this.NPC = response;
     for(let i=0; i < this.NPC.response.data.length; i++){
      //  this.Ncapacities.push(this.NPC.response.data[i]['nameplate-capacity-mw']);
       this.Ntotal+=this.NPC.response.data[i]['nameplate-capacity-mw'];
       
     }
   });
 
     this.eiaService.getActualCapacity(this.TODStatus.region, this.altCode, TODDD, TODDD).subscribe((response:ActualCapacity) => {this.AC = response;
        for(let i=0; i < this.AC.response.data.length; i++){
        //  this.Acapacities.push(this.AC.response.data[i].value); 
         //console.log(this.AC.response.data[i].value);
         this.Atotal+=this.AC.response.data[i].value; //ATotal
      }
      this.ratio = this.Atotal/this.Ntotal;
     });
     //console.log(this.AC);
    

  }

  getNetOutput(id:number):any{

    //get codes :) 
    //response not saved, just codes we need from the response 
    this.plantService.GetPlantProps(id).subscribe((response:PlantProperties) => {
      this.fuelTypeCode=response.FuelTypeCode;
      this.altCode=response.AltCode;
    });
    let getRatiod:number = this.getRatio()
    let netCapacity:number =-1;
    for(let i = 0; i<this.allPlants.length-1; i++){
      if(this.allPlants[i].fuelId == id && this.allPlants[i].powState == true){
        netCapacity = (this.allPlants[i].nameplateCapacity * getRatiod);
      }
    }
    console.log(netCapacity)
    return netCapacity;
  }
}


// getRatio(FuelType:string, AltCode:string):any{
//   //default time of day is midday, default season is summer, default region is AZPS
//   let datetime:string = this.TODStatus.season+this.TODStatus.time
//   let monthdate:string = this.TODStatus.time.slice(0,8);
//   //console.log(monthdate);
//   this.eiaService.getDemand(this.TODStatus.region, datetime, datetime).subscribe((response:Demand) => {this.demand = response; console.log(this.demand)});
//   this.eiaService.getNameplateCapacity(this.TODStatus.region, FuelType, monthdate, monthdate ).subscribe((response:Npc) =>{this.NPC = response;
//   for(let i=0; i < this.NPC.response.data.length; i++){
//     this.Ncapacities.push(this.NPC.response.data[i]['nameplate-capacity-mw']);
//     this.Ntotal+=this.NPC.response.data[i]['nameplate-capacity-mw'];
//   }
// });

//   this.eiaService.getActualCapacity(this.TODStatus.region, AltCode, datetime, datetime ).subscribe((response:ActualCapacity) => {this.AC = response;
//      for(let i=0; i < this.AC.response.data.length; i++){
//       this.Acapacities.push(this.AC.response.data[i].value);
//       //console.log(this.AC.response.data[i].value);
//       this.Atotal+=this.AC.response.data[i].value;
//    }
//   });
//   this.ratio = this.Atotal/this.Ntotal;
//   return this.ratio;
// }