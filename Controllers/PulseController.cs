using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Paroo.Models;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Microsoft.AspNetCore.Authorization;
using Paroo.Repositories.Interfaces;


namespace Paroo.Controllers
{
    [Authorize]
    public class PulseController : Controller
    {
        private readonly ILogger<PulseController> _logger;
        private readonly IProductRepository _productRepository;
        private readonly IProductQueries _productQueries;

        public PulseController(IProductQueries productQueries,ILogger<PulseController> logger,  IProductRepository productRepository)
        {
            _logger = logger;
            _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
            _productQueries = productQueries ?? throw new ArgumentNullException(nameof(productQueries));
        }


        [HttpPost]
        public async Task<IActionResult> index(PulseType pulse, string dt_src)
        {
            if (pulse == PulseType.ViewedProduct)
            {
                return await UserViewedProduct(int.Parse(dt_src));
            }
            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> UserViewedProduct(int productId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Ok();
            await _productRepository.Add(Guid.Parse(userId), productId);
            return Ok();
        }

    }
}
