using System;
using System.Collections.Generic;

namespace Group3Project.Models
{
    public partial class BuiltPlant
    {
        public int Id { get; set; }
        public int? FuelId { get; set; }
        public int? NameplateCapacity { get; set; }
        public bool? PowState { get; set; }

        public virtual PlantProp? Fuel { get; set; }
    }
}
