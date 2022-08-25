using Group3Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Group3Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantPropController : ControllerBase
    {
        EnergyDBContext context = new EnergyDBContext();

        [HttpGet("GetProps/{id}")] 
        public PlantProp GetProps(int id)
        {
            return context.PlantProps.Where(p => p.Id == id).FirstOrDefault();

        } 

        //obviously this is not done :) 
        [HttpPost("AddPlantProps")] 
        public PlantProp AddProps(PlantProp test)
        {
            context.PlantProps.Add(test);
            context.SaveChanges();
            return test;
        } 
    }
}
