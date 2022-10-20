using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Paroo.Models;
using System;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using Corper.API.Application.Queries;
using Microsoft.AspNetCore.Authorization;
using Paroo.Entities.ProductAggregate;
using Paroo.Exceptions;
using Paroo.Repositories.Interfaces;
using Paroo.Services.ParooServices.interfaces;
using Paroo.Helpers;
using System.Collections.Generic;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Http.Features;
using System.Linq;
using System.Net.Http;
using System.IO;
using Newtonsoft.Json;
using Paroo.Entities.MediaAggregate;
using Microsoft.AspNetCore.Hosting;

//Todo: Sqlite seems to be storing Guids in uppercase
//https://stackoverflow.com/questions/69209096/guid-values-stored-in-uppercase-by-ef-core-5-and-sqlite
namespace Paroo.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly IProfileService _profileService;
        private readonly IProductService _productService;
        private readonly IHostingEnvironment _env;
        private static readonly FormOptions _defaultFormOptions = new FormOptions();

        public ProductController(IProfileService profileService, IHostingEnvironment env, IProductService productService)
        {
            _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
            _env = env;
        }

        [AllowAnonymous]
        [Route("/product")]
        [Route("product/{id:int}")]
        public async Task<IActionResult> Index(int id)
        {
            if (id == 0) throw new ParooNotFoundException();
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId != null)
            {
                var profile = await _profileService.FetchProfile(userId);
                if (profile == null) return RedirectToAction("UpdateProfile", "Home");
                ViewData["profile"] = profile;
            }

            //lets fetch the product
            var product = await _productService.GetProductWithLike(id, userId);
            if(userId != null)
            {
                var order = await _productService.GetOrder(id, userId);
                ViewData["order"] = order;
            }
            
            ViewData["product"] = product ?? throw new ParooNotFoundException("Product not found");
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        
        public async Task<IActionResult> Add()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profile = await _profileService.FetchProfile(userId);
            if (profile == null) return RedirectToAction("UpdateProfile", "Home");
            ViewData["profile"] = profile;
            return View();
        }

        public async Task<IActionResult> AddToWhish(int productId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _productService.AddToWhish(userId, productId);
            return Ok();
        }


        [HttpPost]
        [DisableFormValueModelBinding]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Bulk()
        {
            BundleDTO bul = new BundleDTO();
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
            var whitelist = new HashSet<string>(StringComparer.CurrentCultureIgnoreCase)
                { "image/jpeg", "video/mp4", "image/png" };
            // Used to accumulate all the form url encoded key value pairs in the 
            // request.
            var formAccumulator = new KeyValueAccumulator();

            var boundary = MultipartRequestHelper.GetBoundary(
                MediaTypeHeaderValue.Parse(Request.ContentType),
                _defaultFormOptions.MultipartBoundaryLengthLimit);
            var reader = new MultipartReader(boundary, HttpContext.Request.Body);

            var section = await reader.ReadNextSectionAsync();
            while (section != null)
            {
                ContentDispositionHeaderValue contentDisposition;
                var hasContentDispositionHeader =
                    ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);
                if (hasContentDispositionHeader)
                {
                    var contentType = section.ContentType;
                    var fileType = "";
                    string[] tags;
                    var valid = false;
                    if (contentType != null)
                    {
                        var filter = contentType.Split('/');
                        fileType = filter[0];
                        tags = contentType.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                        valid = tags.Any(whitelist.Contains);

                        if (!valid) return BadRequest("Invalid file upload");
                    }

                    var newName = contentDisposition.FileName.ToString();
                    if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                    {
                        //Todo: should ever the rest of the upload fail, clean already uploaded files
                        var streamContent = new StreamContent(section.Body);
                        streamContent.Headers.Add("File-Type", contentType);
                        //streamContent.Headers.Add("Original-Name", newName);
                        streamContent.Headers.Add("Stream-Length", section.Body.Length.ToString());
                        //await section.Body.CopyToAsync(targetStream);

                        var media = await UploadFile(streamContent, newName);
                        bul.media = media;

                    }
                    else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                    {
                        // Content-Disposition: form-data; name="key" value
                        // Do not limit the key name length here because the 
                        // multipart headers length limit is already in effect.
                        var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                        var encoding = Extensions.ControllerExtensions.GetEncoding(section);
                        using (var streamReader = new StreamReader(
                            section.Body,
                            encoding,
                            true,
                            1024,
                            true)
                        )
                        {
                            // The value length limit is enforced by MultipartBodyLengthLimit
                            var value = await streamReader.ReadToEndAsync();
                            if (string.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                                value = string.Empty;

                            switch (key.Value)
                            {
                                case "title":
                                    bul.title = value;
                                    break;
                                case "description":
                                    bul.description = value;
                                    break;
                                case "discount":
                                    bul.discount = int.Parse(value);
                                    break;
                            }

                            formAccumulator.Append(key.Value, value);

                            if (formAccumulator.ValueCount > _defaultFormOptions.ValueCountLimit)
                                throw new InvalidDataException(
                                    $"Form key count limit {_defaultFormOptions.ValueCountLimit} exceeded.");
                        }
                    }
                }

                // Drains any remaining section body that has not been consumed and
                // reads the headers for the next section.
                section = await reader.ReadNextSectionAsync();
            }
            var res = await _productService.CreateBundle(bul, userId);
            return Ok(res);
        }

        [HttpPost]
        [DisableFormValueModelBinding]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateBanner()
        {
            var bundleId = 0;
            Media media = null;
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
            var whitelist = new HashSet<string>(StringComparer.CurrentCultureIgnoreCase)
                { "image/jpeg", "video/mp4", "image/png" };
            // Used to accumulate all the form url encoded key value pairs in the 
            // request.
            var formAccumulator = new KeyValueAccumulator();

            var boundary = MultipartRequestHelper.GetBoundary(
                MediaTypeHeaderValue.Parse(Request.ContentType),
                _defaultFormOptions.MultipartBoundaryLengthLimit);
            var reader = new MultipartReader(boundary, HttpContext.Request.Body);

            var section = await reader.ReadNextSectionAsync();
            while (section != null)
            {
                ContentDispositionHeaderValue contentDisposition;
                var hasContentDispositionHeader =
                    ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);
                if (hasContentDispositionHeader)
                {
                    var contentType = section.ContentType;
                    var fileType = "";
                    string[] tags;
                    var valid = false;
                    if (contentType != null)
                    {
                        var filter = contentType.Split('/');
                        fileType = filter[0];
                        tags = contentType.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                        valid = tags.Any(whitelist.Contains);

                        if (!valid) return BadRequest("Invalid file upload");
                    }

                    var oldName = contentDisposition.FileName.ToString();
                    if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                    {
                        //Todo: should ever the rest of the upload fail, clean already uploaded files
                        var streamContent = new StreamContent(section.Body);
                        streamContent.Headers.Add("File-Type", contentType);
                        //streamContent.Headers.Add("Original-Name", newName);
                        streamContent.Headers.Add("Stream-Length", section.Body.Length.ToString());
                        //await section.Body.CopyToAsync(targetStream);
                        media = await UploadFile(streamContent, oldName);
                    }
                    else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                    {
                        // Content-Disposition: form-data; name="key" value
                        // Do not limit the key name length here because the 
                        // multipart headers length limit is already in effect.
                        var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                        var encoding = Extensions.ControllerExtensions.GetEncoding(section);
                        using (var streamReader = new StreamReader(
                            section.Body,
                            encoding,
                            true,
                            1024,
                            true)
                        )
                        {
                            // The value length limit is enforced by MultipartBodyLengthLimit
                            var value = await streamReader.ReadToEndAsync();
                            if (string.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                                value = string.Empty;

                            switch (key.Value)
                            {
                                case "bundleId":
                                    bundleId = int.Parse(value);
                                    break;
                            }

                            formAccumulator.Append(key.Value, value);

                            if (formAccumulator.ValueCount > _defaultFormOptions.ValueCountLimit)
                                throw new InvalidDataException(
                                    $"Form key count limit {_defaultFormOptions.ValueCountLimit} exceeded.");
                        }
                    }
                }

                // Drains any remaining section body that has not been consumed and
                // reads the headers for the next section.
                section = await reader.ReadNextSectionAsync();
            }
            var m = await _productService.UpdateBundleBanner(media, bundleId, userId,  _env.WebRootPath);

           return Ok(m);
        }

        [HttpPost]
        [DisableFormValueModelBinding]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SubmitProduct()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            ProductViewModel product = new ProductViewModel();
            product.UserId = Guid.Parse(userId);
            
            if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
            var whitelist = new HashSet<string>(StringComparer.CurrentCultureIgnoreCase)
                { "image/jpeg", "video/mp4", "image/png" };
            // Used to accumulate all the form url encoded key value pairs in the 
            // request.
            var formAccumulator = new KeyValueAccumulator();

            var boundary = MultipartRequestHelper.GetBoundary(
                MediaTypeHeaderValue.Parse(Request.ContentType),
                _defaultFormOptions.MultipartBoundaryLengthLimit);
            var reader = new MultipartReader(boundary, HttpContext.Request.Body);

            var section = await reader.ReadNextSectionAsync();
            while (section != null)
            {
                ContentDispositionHeaderValue contentDisposition;
                var hasContentDispositionHeader =
                    ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out contentDisposition);
                if (hasContentDispositionHeader)
                {
                    var contentType = section.ContentType;
                    var fileType = "";
                    string[] tags;
                    var valid = false;
                    if (contentType != null)
                    {
                        var filter = contentType.Split('/');
                        fileType = filter[0];
                        tags = contentType.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                        valid = tags.Any(whitelist.Contains);

                        if (!valid) return BadRequest("Invalid file upload");
                    }

                    var oldName = contentDisposition.FileName.ToString();
                    if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                    {
                        //Todo: should ever the rest of the upload fail, clean already uploaded files
                        var streamContent = new StreamContent(section.Body);
                        streamContent.Headers.Add("File-Type", contentType);
                        //streamContent.Headers.Add("Original-Name", newName);
                        streamContent.Headers.Add("Stream-Length", section.Body.Length.ToString());
                        //await section.Body.CopyToAsync(targetStream);

                        var media = await UploadFile(streamContent, oldName);
                        product.medias.Add(media);
                       
                    }
                    else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                    {
                        // Content-Disposition: form-data; name="key" value
                        // Do not limit the key name length here because the 
                        // multipart headers length limit is already in effect.
                        var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                        var encoding = Extensions.ControllerExtensions.GetEncoding(section);
                        using (var streamReader = new StreamReader(
                            section.Body,
                            encoding,
                            true,
                            1024,
                            true)
                        )
                        {
                            // The value length limit is enforced by MultipartBodyLengthLimit
                            var value = await streamReader.ReadToEndAsync();
                            if (string.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                                value = string.Empty;

                            switch (key.Value)
                            {
                                case "name":
                                    product.name = value;
                                    break;
                                case "price":
                                    product.Price = int.Parse(value);
                                    break;
                                case "points":
                                    product.Points = int.Parse(value);
                                    break;
                                case "description":
                                    product.Description = value;
                                    break;
                                case "swappable":
                                    product.swappable = bool.Parse(value); 
                                    break;
                                case "TargetAudience":
                                    product.TargetAudience = (TargetAudience) int.Parse(value);
                                    break;
                                case "CategoryId":
                                    product.CategoryId = int.Parse(value);
                                    break;
                                case "Quantity":
                                    product.Quantity = int.Parse(value);
                                    break;
                                case "StateId":
                                    product.StateId = int.Parse(value);
                                    break;
                            }

                            formAccumulator.Append(key.Value, value);

                            if (formAccumulator.ValueCount > _defaultFormOptions.ValueCountLimit)
                                throw new InvalidDataException(
                                    $"Form key count limit {_defaultFormOptions.ValueCountLimit} exceeded.");
                        }
                    }
                }

                // Drains any remaining section body that has not been consumed and
                // reads the headers for the next section.
                section = await reader.ReadNextSectionAsync();
            }



            var res = await _productService.Add(product);
            product.Id = res.Id;
            return Ok(product);
        }


        public async Task<IActionResult> GetProductsForSwap(int pageSize, int page, int point, int price)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.GetProductsByStatusAndPriceAndPointsAsync(Guid.Parse(userId), ProductStatus.Open, price, point, pageSize, page);
            return Ok(res);
        }

        public async Task<IActionResult> GetProductOrder(int pageNumber, int pageSize, int productId)
        {
            var res = await _productService.FetchOrderQuery(pageNumber, pageSize, productId);
            return Ok(res);
        }


        [HttpPost]
        public async Task<IActionResult> AddToCart(int id)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (id == 0) return BadRequest();
            await _productService.AddToCartAsync(id, Guid.Parse(userId));
            return Ok();
        }


        [HttpGet]
        public async Task<IActionResult> UserProducts(int pageNumber, int pageSize, int count, string filter, string userId)
        {
            var products = await _productService.FetchProductByUserId(pageNumber, pageSize, userId, count, filter);
            return Ok(products);
        }


        [HttpPost]
        public async Task<IActionResult> Bid(int productId, int swapId, ExchangeType exchange, int point)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _productService.Bid(productId, swapId, Guid.Parse(userId), exchange, point);
            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> RejectOrder(int orderId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _productService.RejectOrder(orderId, userId);
            return Ok();
        }


        


        [HttpPut]
        public async Task<IActionResult> UpdateBulk(BundleDTO bul)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.UpdateBundle(bul, userId);
            return Ok(res);
        }


        [HttpPost]
        public async Task<IActionResult> AcceptOrder(int orderId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _productService.AcceptOrder(orderId, userId);
            return Ok();
        }

        public async Task<IActionResult> FetchCart()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var cats = await _productService.FetchCart(userId);
            return Ok(cats);
        }


        [AllowAnonymous]
        public async Task<IActionResult> FetchProducts(int pageNumber, int pageSize, string flag)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.FetchProducts(pageNumber,pageSize, flag, userId??Guid.Empty.ToString());
            return Ok(res);
        }


        public async Task<IActionResult> UploadedProducts(int pageNumber, int pageSize, int count)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.UserProducts( pageNumber,  pageSize,  count, userId);
            return Ok(res);
        }

        public async Task<IActionResult> Buying(int pageNumber, int pageSize, int count)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.OrdersByUser(pageNumber, pageSize, count, userId, 0);
            return Ok(res);
        }

        public async Task<IActionResult> Selling(int pageNumber, int pageSize, int count)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.OrdersForUser(pageNumber, pageSize, count, userId, 0);
            return Ok(res);
        }

        [AllowAnonymous]
        public async Task<IActionResult> FetchCategories(int count, int pageSize, int page)
        {
            var cats = await _productService.FetchCategoriesAsync();
            return Ok(cats); 
        }
        
        private async Task<Media> UploadFile(StreamContent _stream, string originalName)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var Timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
            string webRootPath = _env.WebRootPath;
            string newFileName = Timestamp + "_" + userId + "_" + Guid.NewGuid().ToString().Substring(0, 10) + Path.GetExtension(originalName);
            string targetFilePath = Path.Combine(webRootPath, $"UploadedFiles\\Images\\{newFileName}");
            using (var targetStream = System.IO.File.Create(targetFilePath))
            {
                await _stream.CopyToAsync(targetStream);
                //await Request.Body.CopyToAsync(targetStream);
                targetStream.Close();
            }
            var mediaType = Request.Headers["File-Type"];

            var media = new Media
            {
                UserId = Guid.Parse(userId),
                Url = $"UploadedFiles/Images/{newFileName}"
            };

            if (mediaType == "image")
            {
                media.MediaType = MediaType.Image;
            }
            else if (mediaType == "video")
            {
                media.MediaType = MediaType.Video;
            }

            return media;
        }

        //Bundles
        public async Task<IActionResult> FetchBundles(int pageNumber, int pageSize, int count)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.FetchBundles(pageNumber, pageSize, count, userId);
            return Ok(res);
        }


        public async Task<IActionResult> BundleProducts(int bundleId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.FetchBundleProducts( userId, bundleId);
            return Ok(res);
        }

        public async Task<IActionResult> RemoveFromBundle(int bundleId, int productId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _productService.RemoveFromBundle(userId, productId, bundleId);
            return Ok();
        }


        public async Task<IActionResult> ProductsToBundle(int pageNumber, int pageSize, int count)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = await _productService.ProductsToBundle(pageNumber, pageSize, count, userId);
            return Ok(res);
        }


        [HttpPost]
        public async Task<IActionResult> AddToBundle(string products, int bundleId)
        {
            if(products == null || products.Length == 0) return BadRequest();
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _productService.AddToBundle(products, userId, bundleId);
            return Ok();
        }
    }
}
