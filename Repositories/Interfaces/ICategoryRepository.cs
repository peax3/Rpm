using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.OrderAggregate;

namespace Paroo.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> FindCategoryById(int id);
        Task<Category> FindCategoryByName(string name);
        Task<QueryResult<Category>> FetchCategories(int count, int pageSize, int page);
        Task<List<Category>> FetchCategories();
        Task Save();
        Task<Category> Add(Category cat);
        Task<int> GetCategoryCount();
        Task<List<Category>> FetchCategories(int count);
    }
}
