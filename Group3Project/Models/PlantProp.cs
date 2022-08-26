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
        public int? MinCapacity { get; set; }
        public int? MaxCapacity { get; set; }
        public bool? RampRate { get; set; }

        public virtual ICollection<BuiltPlant> BuiltPlants { get; set; }
    }
}
