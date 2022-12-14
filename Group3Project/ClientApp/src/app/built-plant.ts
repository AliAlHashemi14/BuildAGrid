import { PlantProperties } from "./plant-properties";

export interface BuiltPlant { 
    id:number;
    fuelId: number;
    nameplateCapacity:number;
    powState:boolean;
    npc:number;
    ac:number;
    fuel:PlantProperties;
}
