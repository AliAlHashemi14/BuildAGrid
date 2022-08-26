import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantProperties } from '../plant-properties';
import {SandboxService} from '../sandbox.service'
import { NewPlant } from '../new-plant';

@Component({
  selector: 'app-create-aplant',
  templateUrl: './create-aplant.component.html',
  styleUrls: ['./create-aplant.component.css']
})
export class CreateAPlantComponent implements OnInit {
 //check limits
  npc:number[]=[10, 50, 100, 250, 500, 1000, 1500];
  plant:NewPlant = {} as NewPlant;
 
  //could be used for database l8r
  limits:any[] = [
    {
      id:1,
      max:50,
    },
    {
      id:2,
      max:500
    }
  ];
  selectedLimit:any = this.limits[0];

  @Output() created = new EventEmitter<NewPlant>();

  constructor(private sandboxService:SandboxService ) { }

  ngOnInit(): void {
  }

  newPlant(form:NgForm):void{
    this.plant.fuelId = form.form.value.fuelId;
    this.plant.namplateCapacity = form.form.value.namplateCapacity;
    this.plant.powState = form.form.value.powState;
    
  }
//grab all the numbers from the starting to the max
  getWatts():number[]{
    let result:number[] = [];
    this.npc.forEach(n => {
      if(n <= this.selectedLimit.max)
      {
        result.push(n);
      }
    })
    return result;
  }

    changeLimit(id:any):void{
      this.limits.forEach(l => {
        if(l.id == id.target.value){
          this.selectedLimit = l;
        }
      })
    }
}
