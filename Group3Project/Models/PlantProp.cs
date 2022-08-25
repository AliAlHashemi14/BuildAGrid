using System;
using System.Collections.Generic;

namespace Group3Project.Models
{
    public partial class PlantProp
    {
        public PlantProp()
        {
            BuiltPlants = new HashSet<BuiltPlant>();
        }

        public int Id { get; set; }
        public string? FuelType { get; set; }
        public int? RampRate { get; set; }
        public double? Co2perMw { get; set; }
        public int? AvgPlantSize { get; set; }


        public virtual ICollection<BuiltPlant> BuiltPlants { get; set; }
    }
}
