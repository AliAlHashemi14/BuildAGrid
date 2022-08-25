using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Group3Project.Models
{
    public partial class EnergyDBContext : DbContext
    {
        public EnergyDBContext()
        {
        }

        public EnergyDBContext(DbContextOptions<EnergyDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BuiltPlant> BuiltPlants { get; set; } = null!;
        public virtual DbSet<PlantProp> PlantProps { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=energyproject.database.windows.net;Initial Catalog=EnergyDB; User Id=group3; Password=Bootcamp101;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BuiltPlant>(entity =>
            {
                entity.Property(e => e.NameplateCapacity).HasColumnName("nameplateCapacity");

                entity.HasOne(d => d.Fuel)
                    .WithMany(p => p.BuiltPlants)
                    .HasForeignKey(d => d.FuelId)
                    .HasConstraintName("FK__BuiltPlan__FuelI__693CA210");
            });

            modelBuilder.Entity<PlantProp>(entity =>
            {
                entity.Property(e => e.Co2perMw).HasColumnName("CO2perMW");

                entity.Property(e => e.FuelType).HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
