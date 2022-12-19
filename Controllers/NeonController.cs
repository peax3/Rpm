using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.DispatchAggregate;
using Paroo.Entities.ProductAggregate;
using Paroo.Exceptions;
using Paroo.Models.Neon;
using Paroo.Services.ParooServices.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Paroo.Controllers
{
    [Authorize]
    public class NeonController : Controller
    {
        private readonly IProfileService _profileService;
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        public readonly DataContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;


        public NeonController(IProfileService profileService, DataContext context, UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager, IProductService productService, ICategoryService categoryService)
        {
            _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
            _categoryService = categoryService ?? throw new ArgumentNullException(nameof(categoryService));
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userManager = userManager;
            _roleManager = roleManager;
        }


        public IActionResult Index()
        {
            return View();
        }


        //Every single request that has to do with users
        //are grouped here
        #region Users
        [HttpPost]
        public async Task<IActionResult> GetMembersSummary(int count, int pageSize, int page)
        {
            var data = await _profileService.GetMembersSummary(count, pageSize, page);
            return Ok(data);
        }
        #endregion


        #region Categories
        public async Task<IActionResult> FetchCategories(int count, int pageSize, int page)
        {
            var data = await _categoryService.FetchCategories(count, pageSize, page);
            return Ok(data);
        }


        public async Task<IActionResult> FetchAllCat()
        {
            var data =  _context.categories.Where(c=>c.ParentCategory == null).ToList();
            return Ok(data);
        }

        public IActionResult FetchSubCategories(int pid)
        {
            var cats = _context.categories.Where(c => c.ParentCategory == pid).ToList();
            return Ok(cats);
        }


        public IActionResult FetchCategoryPrices(int pid)
        {
            var cats = _context.category_prices.Where(c => c.CategoryId == pid).ToList();
            return Ok(cats);
        }


        //Todo: move to service layer later
        [HttpPost]
        public async Task<IActionResult> updatecat(int id, string name)
        {
           var cat = await _context.categories.FindAsync(id);
           if (cat == null) throw new ParooNotFoundException("category not found");
           cat.name = name;
           await _context.SaveChangesAsync();
           return Ok(cat);
        }


        [HttpDelete]
        public async Task<IActionResult> deletecat(int id)
        {
            var cat = await _context.categories.FindAsync(id);
            if (cat == null) throw new ParooNotFoundException("category not found");
            if(cat.ProductCount > 0)
            {
                return BadRequest("This category is attached to a product");
            }
            
            var subs = _context.categories.Where(c=>c.ParentCategory == c.Id).ToList();
            foreach (var item in subs)
            {
                if(item.ProductCount > 0) return BadRequest("This category has a sub category attached to a product");
            }
            //if we get here
            //the category or subs havent be assigned to any product
            _context.categories.Remove(cat);
            _context.categories.RemoveRange(subs);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> catprice(int pid, ProductCondition condition, decimal price)
        {
            var cat = _context.category_prices.Where(c=>c.CategoryId == pid && c.Condition == condition).SingleOrDefault();
            if (cat == null)
            {
                var newCatPrice = new CategoryPrices
                {
                    CategoryId = pid,
                    Price = price,
                    Condition = condition
                };

                await _context.category_prices.AddAsync(newCatPrice);
                cat = newCatPrice;
            }
            else
            {
                cat.Price = price;
            }

            await _context.SaveChangesAsync();
            return Ok(cat);
        }



        [HttpPost]
        public async Task<IActionResult> addsub(int pid, string name)
        {
            var cat = await _context.categories.FindAsync(pid);
            if (cat == null) throw new ParooNotFoundException("category not found");
            var subCat = new Category
            {
                name = name,
                ParentCategory = cat.Id
            };
            await _context.categories.AddAsync(subCat);
            await _context.SaveChangesAsync();
            return Ok(subCat);
        }


        [HttpPost]
        public async Task<IActionResult> addcat(int parentCat, string name)
        {
            Category cat = null;
            if(parentCat > 0)
            {
                cat = await _context.categories.FindAsync(parentCat);
            }
            var subCat = new Category
            {
                name = name
            };
            if(cat != null) subCat.ParentCategory = cat.Id;
            await _context.categories.AddAsync(subCat);
            await _context.SaveChangesAsync();
            return Ok(subCat);
        }
        #endregion


        #region Roles
        [HttpGet]
        //Todo: at least two queries can be summed into one
        public async Task<IActionResult> GetUserRoles(string email)
        {
            var data = new UserRoleDTO();
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var profile = _context.profiles.Where(p=>p.UserId == Guid.Parse(user.Id)).FirstOrDefault();
                data.name = profile.FirstName + " " + profile.LastName;
                data.uid = user.Id;
                data.picture = profile.Picture;
                var roles = await _userManager.GetRolesAsync(user);
                data.roles = roles;
                return Ok(data);
               
            }
            return BadRequest();
        }


        [HttpGet]
        //Todo: at least two queries can be summed into one
        public async Task<IActionResult> GetDispatchers()
        {
            var users = await _userManager.GetUsersInRoleAsync("DISPATCHER");
            var usersToFetch = users.Select(x=>Guid.Parse(x.Id)).ToList();
            var profiles = _context.profiles.Where(x=> usersToFetch.Contains(x.UserId)).ToList();  
            return Ok(profiles);
        }


        [HttpPost]
        public async Task<IActionResult> AssignProduct(string userId, string products)
        {
            var user_id = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
           
            var user = await _userManager.FindByIdAsync(userId);
            if (await _userManager.IsInRoleAsync(user, "DISPATCHER"))
            {
                var uids = products.Split(',').Select(s => int.Parse(s)).ToList();
                var pros = _context.products.Where(p => uids.Contains(p.Id) && p.ProductStatus == ProductStatus.Open);
                if(pros.Count() != uids.Count) throw new ParooInvalidOperationException("Error processing request");
                var inserts  = new List<Dispatcher>();
                var now = DateTime.Now;
                foreach (var item in pros)
                {
                    inserts.Add(
                      new Dispatcher
                      {
                          AssignedBy = Guid.Parse(user_id),
                          Created = now,
                          ProductId = item.Id,
                          UserId = Guid.Parse(user.Id)
                      }
                    );
                }
                
                await _context.dispatchers.AddRangeAsync(inserts);
                await _context.SaveChangesAsync();
                return Ok(inserts);
            }
            return BadRequest("Error processing request");
        }



        [HttpGet]
        //Todo: at least two queries can be summed into one
        public async Task<IActionResult> DispatcherProducts(string userId, int count, int size, int page)
        {
            if(count == 0)
            {
                var res = await _context.dispatchers.FromSqlRaw(@"
                Select * from dispatchers where UserId = @userId", new SqlParameter("userId", userId)).ToListAsync();
                count = res.Count;
            }

            var products = await _context.products.FromSqlRaw(@"
                Select * from products p where p.Id in (select ProductId from dispatchers where UserId = @userId) 
                        ORDER BY p.Id
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY
            ", 
            new SqlParameter("userId", userId),
            new SqlParameter("pageSize", size),
            new SqlParameter("pageNumber", page)
            ).ToListAsync();

            var data =  new QueryResult<Product>
            {
                Results = products,
                TotalNumberOfItems = count,
                TotalNumberOfPages = (count / size) + ((count % size) == 0 ? 0 : 1),
                PageSize = size
            };
            return Ok(data);
        }


        [HttpGet]
        //Todo: at least two queries can be summed into one
        public async Task<IActionResult> GetProductForDispatch(int count, int size, int page)
        {
            if (count == 0)
            {
                var res = await _context.products.FromSqlRaw(@"
                Select * from products p where p.ProductStatus = 0 and p.Id not in (select ProductId from dispatchers)").ToListAsync();
                count = res.Count;
            }

            var products = await _context.products.FromSqlRaw(@"
                Select * from products p where p.Id not in (select ProductId from dispatchers) and
                        p.ProductStatus = 0
                        ORDER BY p.Id
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY
            ",
            new SqlParameter("pageSize", size),
            new SqlParameter("pageNumber", page)
            ).ToListAsync();

            var data = new QueryResult<Product>
            {
                Results = products,
                TotalNumberOfItems = count,
                TotalNumberOfPages = (count / size) + ((count % size) == 0 ? 0 : 1),
                PageSize = size
            };
            return Ok(data);
        }

        public IActionResult Roles()
        {
            var roles = _roleManager.Roles;
            return Ok(roles);
        }
        #endregion

    }
}
