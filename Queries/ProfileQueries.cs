using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Dapper;
using Microsoft.Data.SqlClient;
using Paroo.Entities;
using Paroo.Entities.UserAggregate;
using Paroo.Models;
using Paroo.Models.Neon;

namespace Paroo.Queries
{
    public class ProfileQueries : IProfileQueries
    {
        private string _connectionString = string.Empty;

        public ProfileQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));
     
        }


        public async Task<int> GetTotalUserFavourites(string userId)
        {
            var count = 0;
            var parameters = new { userId };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from user_likes where UserId = @userId";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }

      

        public async Task<ParooStat> GetParooStats(string userId)
        {
            var parameters = new { userId };
            ParooStat stat = new ParooStat();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                        select COUNT(*) as upload_count from products where products.UserId = @userId; 
                        select COUNT(*) as active_count from products where products.UserId = @userId and products.ProductStatus = 0;
                        select COUNT(*) as completed_count from products where products.UserId = @userId and products.ProductStatus = 2;
                    ";

                    var data = await conn.QueryMultipleAsync(querySQL, parameters);
                    stat.upload_count = await data.ReadSingleAsync<int>();
                    stat.active_count = await data.ReadSingleAsync<int>();
                    stat.completed_count = await data.ReadSingleAsync<int>();
                }

                return stat;
            }
            catch (Exception ex)
            {

                throw;
            }

        }


        public async Task<QueryResult<Profile>> FetchFavouriteUsers(int pageNumber, int pageSize, string userId, int count)
        {
            var parameters = new { pageNumber, pageSize, userId };
            if (count == 0)
            {
                count = await GetTotalUserFavourites(userId);
            }
            IEnumerable<Profile> users;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        SELECT p.*
                        from profiles p
                        where p.UserId in (select user_likes.ProfileId from user_likes where user_likes.UserId = @userId )
                        ORDER BY p.Id
                        OFFSET @pageSize * (@pageNumber - 1) ROWS
                        FETCH NEXT @pageSize ROWS ONLY
                    ";

                    users = await conn.QueryAsync<Profile>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return new QueryResult<Profile>
            {
                Results = users,
                TotalNumberOfItems = count,
                TotalNumberOfPages = (count / pageSize) + ((count % pageSize) == 0 ? 0 : 1),
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }


        public async Task<ProfileStat> GetProfileStat(string userId, string viewer)
        {
            if(viewer == null) viewer = Guid.Empty.ToString();
            var parameters = new { userId, viewer };
            ProfileStat stat = new ProfileStat();
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                        select count(*) as total_products from products where UserId = @userId;
                        select count(*) as total_bids from orders where UserId = @userId
                        select count(*) as total_swaps from orders where UserId = @userId and orders.ExchangeType = 1;
                        select count(*) as total_favourites from user_likes where user_likes.ProfileId = @userId;
                        select user_likes.Id as bookmarked from user_likes where user_likes.UserId = @viewer and user_likes.ProfileId = @userId
                    ";

                    var data = await conn.QueryMultipleAsync(querySQL, parameters);
                    stat.total_products = await data.ReadSingleAsync<int>();
                    stat.total_bids = await data.ReadSingleAsync<int>();
                    stat.total_swaps = await data.ReadSingleAsync<int>();
                    stat.total_favourites = await data.ReadSingleAsync<int>();
                    stat.bookmarked = await data.ReadFirstOrDefaultAsync<int>();
                }

                return stat;
            }
            catch (Exception ex)
            {

                throw;
            }

        }


        public async Task<int> GetMemberCount()
        {
            var count = 0;
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from [dbo].[AspNetUsers]";
                    count = await conn.QueryFirstAsync<int>(querySQL);

                }
            }
            catch (Exception ex)
            {

                throw;
            }

           return count;
        }


        public async Task<QueryResult<Profile>> SearchUsers(int count, int size, int page, string query)
        {
            if (count == 0) count = await SearchUsersCount(query);
            var parameters = new { page, size, query };
            IEnumerable<Profile> products;
            try
            {
                using (

                    var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @$"
                        select p.*
                        from profiles p
                        where FirstName like '%@query%' of LastName like '%@query%'
                        OFFSET @pageSize * (@page - 1) ROWS
                        FETCH NEXT @size ROWS ONLY
                    ";

                    products = await conn.QueryAsync<Profile>(querySQL, parameters);
                }

                return new QueryResult<Profile>
                {
                    Results = products,
                    TotalNumberOfItems = count,
                    TotalNumberOfPages = (count / size) + ((count % size) == 0 ? 0 : 1),
                    PageNumber = page,
                    PageSize = page
                };
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public async Task<int> SearchUsersCount(string query)
        {
            var count = 0;
            var parameters = new { query };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"select count(*) from profiles where FirstName like '%@query%' of LastName like '%@query%'";
                    count = await conn.QueryFirstAsync<int>(querySQL, parameters);
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return count;
        }


        public async Task<QueryResult<ProfileDTO>> GetProfileSummary(int count, int pageNumber, int pageSize)
        {
            IEnumerable<ProfileDTO> profiles;
            var parameters = new { pageNumber, pageSize };
            try
            {
                using (var conn = new SqlConnection(_connectionString))
                {
                    conn.Open();
                    var querySQL = @"
                    select CONCAT(p.FirstName, ' ', p.LastName, ' ') as name,
                    a.LockoutEnabled as active,
                    a.Email,
                    s.name as state, p.DateOfBirth as birth,
                    p.Points as points
                    from profiles p
                    left join AspNetUsers a on
                    a.Id = p.UserId
                    left join states s on
                    s.Id = p.ProvinceId
                    ORDER BY p.Id
                    OFFSET @pageSize * (@pageNumber - 1) ROWS
                    FETCH NEXT @pageSize ROWS ONLY
                    ";

                    profiles = await conn.QueryAsync<ProfileDTO>(querySQL, parameters);

                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return new QueryResult<ProfileDTO>
            {
                Results = profiles,
                TotalNumberOfItems = count,
                TotalNumberOfPages = (count / pageSize) + ((count % pageSize) == 0 ? 0 : 1),
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }
    }
}
