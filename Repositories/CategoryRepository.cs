using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.StateAggregate;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Repositories.Interfaces;

namespace Paroo.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        public readonly DataContext _context;
        public CategoryRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task<Category> FindCategoryById(int id)
        {
            return await _context.categories.FindAsync(id);
        }

        public async Task<QueryResult<Category>> FetchCategories(int totalCount, int pageSize, int page)
        {
            //ignore where clause
            var data = await _context.categories.Skip(pageSize * (page - 1)).Take(pageSize).ToListAsync();
            return new QueryResult<Category>
            {
                Results = data,
                TotalNumberOfItems = totalCount,
                TotalNumberOfPages = (totalCount / pageSize) + ((totalCount % pageSize) == 0 ? 0 : 1),
                PageNumber = page,
                PageSize = pageSize
            };
        }

        public async Task<Category> Add(Category cat)
        {
            _context.categories.Add(cat);
            await Save();
            return cat;
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetCategoryCount()
        {
            return await _context.categories.CountAsync();
        }

        public async Task<List<Category>> FetchCategories()
        {
            return await _context.categories.ToListAsync();
        }

        public async Task<List<Category>> FetchCategories(int count)
        {
            return await _context.categories.Take(5).ToListAsync();
        }

        public async Task<Category> FindCategoryByName(string name)
        {
            return await _context.categories.SingleOrDefaultAsync(c => c.name.ToLower() == name);
        }
    }
}
