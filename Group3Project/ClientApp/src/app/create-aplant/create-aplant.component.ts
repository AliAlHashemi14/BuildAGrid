import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantProperties } from '../plant-properties';
import {SandboxService} from '../sandbox.service'
import { NewPlant } from '../new-plant';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-create-aplant',
  templateUrl: './create-aplant.component.html',
  styleUrls: ['./create-aplant.component.css']
})
export class CreateAPlantComponent implements OnInit {
 //check limits
  plant:NewPlant = {} as NewPlant;
 
  // //could be used for database l8r
  // limits:any[] = [
  //   {
  //     id:1,
  //     max:50,
  //   },
  //   {
  //     id:2,
  //     max:500
  //   }
  // ];
  // selectedLimit:any = this.limits[0];

  @Output() created = new EventEmitter<NewPlant>();

  constructor(private sandboxService:SandboxService, private plantService:PlantService ) { }

  plantData:PlantProperties[] = [];
  id:number = -1;
  max:number = -1;
  min:number = -1;
  npc:number[] = [0.1, 1, 10, 50, 100, 250, 500, 1000, 1500];
  placeholder:number = -1;

  ngOnInit(): void {
    this.plantService.GetAllProps().subscribe((result:any)=> {
      this.plantData=result
      this.max = this.plantData[0].maxCapacity;
      this.min = this.plantData[0].minCapacity;
    });
    
  }

  newPlant(form:NgForm):void{
    // this.plant.fuelId = form.form.value.plantType.id;
    // this.plant.namplateCapacity = form.form.value.npcValues;
    // this.plant.powState = false;
    console.log(form.form.value.plantType);
    console.log(form.form.value.npcValues);
    this.sandboxService.AddAPlant(form.form.value.plantType, form.form.value.npcValues).subscribe((response:any) =>console.log(response));
    //this.sandboxService.GetAllPlants().subscribe((result:any) =>console.log(result))
  }




//grab all the numbers from the starting to the max
  getWatts():number[]{
    let result:number[] = [];
    this.npc.forEach(n => {
      if(n <= this.max && n >= this.min)
      {
        result.push(n);
      }
    })
    return result;
  }

    changeLimit(id:any):any{
      console.log(id.target.value);
      this.plantData.forEach(plant => {
        if(plant.id == id.target.value){
          this.max = plant.maxCapacity;
          this.min = plant.minCapacity;
        }
      })
    }
}
