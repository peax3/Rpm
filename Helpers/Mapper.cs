using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Paroo.Entities.ProductAggregate;
using Paroo.Models;

namespace Paroo.Helpers
{
    //Sorry, not a fan of Automapper :)
    public static class Mapper
    {
        public static Product ProductViewModel_To_Product(ProductViewModel p)
        {
            return new Product
            {
                Created = p.Created,
                Updated = p.Updated,
                TargetAudience = p.TargetAudience,
                ProductCondition = p.ProductCondition,
                swappable = p.swappable,
                Description = p.Description,
                Media = p.Media,
                Name = p.name,
                Price = p.Price,
                Points = p.Points,
                Quantity = p.Quantity,
                StateId = p.StateId,
                UserId = p.UserId,
                Medias = p.medias
            };
        }
    }
}
