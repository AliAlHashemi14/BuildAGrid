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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer($"Data Source={Secret.address};Initial Catalog=EnergyDB; User Id={Secret.userId}; Password={Secret.password};");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BuiltPlant>(entity =>
            {
                entity.Property(e => e.FuelType).HasMaxLength(255);

                entity.Property(e => e.NameplateCapacity).HasColumnName("nameplateCapacity");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
