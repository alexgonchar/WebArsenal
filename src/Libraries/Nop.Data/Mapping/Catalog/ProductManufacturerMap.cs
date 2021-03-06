using System.Data.Entity.ModelConfiguration;
using Nop.Core.Domain.Catalog;

namespace Nop.Data.Mapping.Catalog
{
    public partial class ProductManufacturerMap : EntityTypeConfiguration<ProductManufacturer>
    {
        public ProductManufacturerMap()
        {
            this.ToTable("Product_Manufacturer_Mapping");
            this.HasKey(pm => pm.Id);
            
            this.HasRequired(pm => pm.Manufacturer)
                .WithMany(m => m.ProductManufacturers)
                .HasForeignKey(pm => pm.ManufacturerId);


            this.HasRequired(pm => pm.Product)
                .WithMany(p => p.ProductManufacturers)
                .HasForeignKey(pm => pm.ProductId);
        }
    }
}