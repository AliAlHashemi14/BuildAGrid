using Group3Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Group3Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuiltPlantController : ControllerBase
    {
        EnergyDBContext context = new EnergyDBContext();

        //add to sandbox 
        [HttpPost("AddAPlant")]
        public BuiltPlant AddAPlant(int fuelId, int nameplateCapacity, string userId)
        {
            BuiltPlant newPlant = new BuiltPlant()
            {

                FuelId = fuelId,
                NameplateCapacity = nameplateCapacity,
                PowState = false

            };
            context.BuiltPlants.Add(newPlant);
            context.SaveChanges();

            UserTable table = new UserTable()
            {
                UserId = userId,
                BpId = context.BuiltPlants.OrderBy(b => b.Id).Last().Id
            };
            context.UserTables.Add(table);
            context.SaveChanges();
            return newPlant;
        }

        [HttpDelete("DestroyAPlant")]
        public BuiltPlant DestroyAPlant(int Id)
        {
            BuiltPlant removedPlant = context.BuiltPlants.FirstOrDefault(x => x.Id == Id);
            context.BuiltPlants.Remove(removedPlant);
            context.SaveChanges();
            return removedPlant;
        }

        [HttpGet("GetAllPlants")]
        public List<BuiltPlant> GetAllPlants()
        {
            return context.BuiltPlants.ToList();

        }
        // post - new object 
        // put - same obj, update fields 
        // patch - take an object, update props, submit them as a NEW entry 
        [HttpPut("ModifyCapacities/{Id}")]
        public BuiltPlant ModifyCapacities(int Id, int NPC, int AC)
        {
            BuiltPlant modifiedPlant = context.BuiltPlants.FirstOrDefault(x => x.Id == Id);
            modifiedPlant.Npc = NPC;
            modifiedPlant.Ac = AC;
            context.BuiltPlants.Update(modifiedPlant);
            context.SaveChanges();
            return modifiedPlant;

        }

        [HttpPut("FlipPowState")] 

        public BuiltPlant FlipPowState(int Id)
        {
            BuiltPlant turnOn = context.BuiltPlants.FirstOrDefault(x => x.Id == Id);
            turnOn.PowState = !turnOn.PowState;
            context.BuiltPlants.Update(turnOn);
            context.SaveChanges();
            return turnOn;
        }

        [HttpGet("PlantAndMore")]
        public IEnumerable<BuiltPlant> PlantAndMore()
        {
            // pulling all plants from the database like normal, PlantProp property (fuel) is NULL for all. 
            List<BuiltPlant> plants = context.BuiltPlants.ToList();

            //dictionary : pages = fuel type, definition = PlantProp 
            Dictionary<int, PlantProp> plantsProp = context.PlantProps.ToDictionary(p => p.Id, p => p);

            //go through all plants from database 
            foreach (BuiltPlant iteratedPlant in plants)
            {
                // isolate the plant we care about (for each loop) 
                // set plant property 
                // find the corresponding plant property (Dictionary.Try(getValue) )
                // out - if value is found, where to put 


                if (iteratedPlant.FuelId != null)
                { //if we CAN get props from a fuel id (if it exists) (which it always will but just in 
                    PlantProp please = default; //get said fuel props 
                    bool didFindFuel = plantsProp.TryGetValue((int)iteratedPlant.FuelId, out please);
                    if (didFindFuel)
                    {
                        iteratedPlant.Fuel = please;
                    }
                }
            }
            return plants;
        }

        [HttpGet("PlantAndMoreByUserId/{userId}")]
        public IEnumerable<BuiltPlant> PlantAndMoreByUserId(string userId)
        {
            // pulling all plants from the database like normal, PlantProp property (fuel) is NULL for all. 
            

            List<BuiltPlant> results = new List<BuiltPlant>();

            List<UserTable> matches = context.UserTables.Where(u => u.UserId == userId).ToList();

            foreach(UserTable match in matches)
            {
                BuiltPlant builtPlant = context.BuiltPlants.FirstOrDefault(p => p.Id == match.BpId);
                results.Add(builtPlant);
                
            }
            
            //dictionary : pages = fuel type, definition = PlantProp 
            Dictionary<int, PlantProp> plantsProp = context.PlantProps.ToDictionary(p => p.Id, p => p);

            //go through all plants from database 
            foreach (BuiltPlant iteratedPlant in results)
            {
                // isolate the plant we care about (for each loop) 
                // set plant property 
                // find the corresponding plant property (Dictionary.Try(getValue) )
                // out - if value is found, where to put 


                if (iteratedPlant.FuelId != null)
                { //if we CAN get props from a fuel id (if it exists) (which it always will but just in 
                    PlantProp please = default; //get said fuel props 
                    bool didFindFuel = plantsProp.TryGetValue((int)iteratedPlant.FuelId, out please);
                    if (didFindFuel)
                    {
                        iteratedPlant.Fuel = please;
                    }
                }
            }
            return results;
        }
    }
}


