using Corper.API.Application.Queries;
using Paroo.Entities;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Services.ParooServices.interfaces;
using System;
using System.Threading.Tasks;


namespace Paroo.Services.ParooServices
{
    public class SearchService : ISearchService
    {
        private readonly IProductQueries _productQueries;
        private readonly IProfileQueries _profileQueries;

        public SearchService(IProductQueries productQueries, IProfileQueries profileQueries)
        {
            _productQueries = productQueries ?? throw new ArgumentNullException(nameof(productQueries));
            _profileQueries = profileQueries ?? throw new ArgumentNullException(nameof(profileQueries));
        }

        public async Task<dynamic> Search(int count, int size, int page, string query)
        {
            if(query == "users") return await SearchUsers(count, size, page, query);
            if (query == "catalog") return await SearchProducts(count, size, page, query);
            return null;
        }

        public async Task<QueryResult<ProductQuery>> SearchProducts(int count, int size, int page, string query)
        {
            return await _productQueries.SearchProducts(count, size, page, query);
        }

        public async Task<QueryResult<Profile>> SearchUsers(int count, int size, int page, string query)
        {
            return await _profileQueries.SearchUsers(count, size, page, query);
        }
    }
}
