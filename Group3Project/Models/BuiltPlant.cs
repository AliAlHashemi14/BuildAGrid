using System;
using System.Collections.Generic;

namespace Group3Project.Models
{
    public partial class BuiltPlant
    {
        public int Id { get; set; }
        public string? FuelType { get; set; }
        public int? NameplateCapacity { get; set; }
        public int? RampRate { get; set; }
        public bool? PowState { get; set; }
    }
}
