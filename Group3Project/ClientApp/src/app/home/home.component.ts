import { Component } from '@angular/core';
import { ActualCapacity } from '../actual-capacity';
import { Demand } from '../demand';
import { EiaServiceService } from '../eia-service.service';
import { Npc } from '../npc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor (private eiaService:EiaServiceService) {};

  //Demand object stores a lot of demand data.
  demand:Demand = {} as Demand;
  NPC:Npc = {} as Npc;
  AC:ActualCapacity = {} as ActualCapacity;
  Ncapacities:number[] = [];
  Acapacities:number[] = [];
  Atotal:number = 0;
  Ntotal:number = 0;

  ngOnInit(){
    //default time of day is midday, default season is summer, default region is AZPS
    this.eiaService.getDemand("LDWP", "2021-08-28T20", "2021-08-28T20").subscribe((response:Demand) => {this.demand = response; console.log(this.demand)});
    this.eiaService.getNameplateCapacity("LDWP", "SUN", "2021-08", "2021-08" ).subscribe((response:Npc) =>{this.NPC = response;
    for(let i=0; i < this.NPC.response.data.length; i++){
      this.Ncapacities.push(this.NPC.response.data[i]['nameplate-capacity-mw']);
      this.Ntotal+=this.NPC.response.data[i]['nameplate-capacity-mw'];
    }
  });

    this.eiaService.getActualCapacity("LDWP", "SUN", "2021-08-28T20", "2021-08-28T20" ).subscribe((response:ActualCapacity) => {this.AC = response;
       for(let i=0; i < this.AC.response.data.length; i++){
        this.Acapacities.push(this.AC.response.data[i].value);
        console.log(this.AC.response.data[i].value);
        this.Atotal+=this.AC.response.data[i].value;
     }
    });
  }

}
