using System;
using System.Collections.Generic;

namespace Group3Project.Models
{
    public partial class BuiltPlant
    {
        public BuiltPlant()
        {
            UserTables = new HashSet<UserTable>();
        }

        public int Id { get; set; }
        public int? FuelId { get; set; }
        public int? NameplateCapacity { get; set; }
        public bool? PowState { get; set; }
        public int? Npc { get; set; }
        public int? Ac { get; set; }

        public virtual PlantProp? Fuel { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<UserTable> UserTables { get; set; }
    }
}
