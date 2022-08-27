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
        public BuiltPlant AddAPlant(int fuelId, int nameplateCapacity)
        {
            BuiltPlant newPlant = new BuiltPlant()
            {

                FuelId = fuelId,
                NameplateCapacity = nameplateCapacity,
                PowState = false

            };
            context.BuiltPlants.Add(newPlant);
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

        [HttpPatch("ModifyCapacities/{id}")]
        public BuiltPlant ModifyCapacities(int Id, int NPC, int AC)
        {
            BuiltPlant modifiedPlant = context.BuiltPlants.FirstOrDefault(x => x.Id == Id);
            modifiedPlant.Npc = NPC;
            modifiedPlant.Ac = AC;
            context.BuiltPlants.Update(modifiedPlant);
            context.SaveChanges();
            return modifiedPlant;

        }
    }
}


