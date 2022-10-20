using Paroo.Entities;
using Paroo.Entities.CategoryAggregate;
using Paroo.Entities.StateAggregate;
using Paroo.Repositories.Interfaces;
using Paroo.Services.ParooServices.interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Paroo.Services.ParooServices
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository ?? throw new ArgumentNullException(nameof(categoryRepository));
        }

        public async Task<QueryResult<Category>> FetchCategories(int count, int pageSize, int page)
        {

            if (count > 0)
            {
                //no need to get count
                var data = await _categoryRepository.FetchCategories(count, pageSize, page);
                return data;
            }
            {
                //we need to get the count
                var countz = await _categoryRepository.GetCategoryCount();
                var data = await _categoryRepository.FetchCategories(countz, pageSize, page);
                return data;
            }
        }

        public async Task<List<Category>> FetchCategories(int count)
        {
            return await _categoryRepository.FetchCategories(count);
        }
    }
}
