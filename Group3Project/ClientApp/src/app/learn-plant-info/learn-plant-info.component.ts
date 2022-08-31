import { Component, OnInit } from '@angular/core';
import { PlantInfo } from '../plant-info';

@Component({
  selector: 'app-learn-plant-info',
  templateUrl: './learn-plant-info.component.html',
  styleUrls: ['./learn-plant-info.component.css']
})



export class LearnPlantInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  plantInfo: PlantInfo[] = [

  {plantName: "Nuclear", 
  description: "Nuclear plants heat water to produce steam, which is used to spin large turbines that generate electricity. Nuclear power plants use heat produced during nuclear fission (where atoms are split apart to form smaller atoms, releasing energy) to heat water.", 
  image:"../../assets/nuclear.png"}, 

  {plantName: "Natural Gas", 
  description: "Gas is a fossil fuel which can be used to generate electricity. By burning gas, we create heat which powers a turbine. The rotation of this turbine spins a generator which creates electricity.", 
  image:"../../assets/natural_gas.png"}, 

  {plantName: "Solar", 
  description: "Solar technologies convert sunlight into electrical energy either through photovoltaic (PV) panels or through mirrors that concentrate solar radiation. This energy can be used to generate electricity or be stored for later use.", 
  image:"../../assets/Solar-energy.png"}, 

  {plantName: "Wind", 
  description: "Windy days turn the long blades of a turbine (like the ones you see in large fields) around a rotor, which spins a generator, which creates electricity.", 
  image:"../../assets/Wind-power.svg"}, 

  {plantName: "Water", 
  description: "In hydroelectric power plants, flowing water powers a turbine which spins a generator that is in charge of creating electricity.", 
  image:"../../assets/Hydroelectric-power-plant.png"}, 

  {plantName: "Coal", 
  description: "The heat produced by the combustion (burning) of the coal in power plants is used to convert water into high-pressure steam, which drives a turbine, producing electricity.", 
  image:"../../assets/Coal-power-plant.png"}, 


  ]
  };
  

