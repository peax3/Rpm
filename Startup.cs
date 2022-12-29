using System;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Validation.AspNetCore;
using Paroo.AutofacModules;
using Paroo.Infrastructure;
using Paroo.Middlewares;
using Paroo.Repositories;
using Paroo.Repositories.Interfaces;
using Paroo.Services;
using Serilog;
using WebMVC;
using Autofac.Extensions.DependencyInjection;
using Paroo.Services.ParooServices.interfaces;
using Paroo.Services.ParooServices;
using Paroo.Settings;
using Paroo.Models;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace Paroo
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            //if (_env.IsProduction())
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                    sqlServerOptionsAction: sqlOptions =>
                    {
                        sqlOptions.MigrationsAssembly(typeof(Startup).GetTypeInfo().Assembly.GetName().Name);
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 15, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                    }));


            services.AddIdentity<IdentityUser, IdentityRole>(opt => {
                opt.Lockout.AllowedForNewUsers = true;
                opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
                opt.Lockout.MaxFailedAccessAttempts = 3;
            }).AddEntityFrameworkStores<DataContext>().AddDefaultTokenProviders();
            
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
            });

            //Google reCaptcha Service
            services.AddOptions<CaptchaSettings>("Captcha");
            services.AddTransient<CaptchaVerificationService>();

            services.Configure<AppSettings>(Configuration);
            services.Configure<MailSettings>(Configuration.GetSection("Mailer"));
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IProfileRepository, ProfileRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IStateRepository, StateRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();

            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IStateService, StateService>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<ICategoryService, CategoryService>();

            services.AddTransient<IMailService, MailService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<HttpClientAuthorizationDelegatingHandler>();
            services.AddTransient<HttpClientRequestIdDelegatingHandler>();
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddSingleton(Log.Logger);
            services.AddCors();

            services.AddHttpClient();

            var container = new ContainerBuilder();
            container.Populate(services);
            container.RegisterModule(new ApplicationModule(Configuration.GetConnectionString("DefaultConnection")));

            return new AutofacServiceProvider(container.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            dataContext.Database.Migrate();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapControllerRoute(
                    name: "neon",
                    pattern: "{*anything}", new {controller = "Neon", action="Index"}, new {anything = @"^(.*)?$"});

                endpoints.MapControllerRoute(
                    name: "Categories", "{cat}", defaults: new { controller = "Home", action = "Fetcher", cat = "" });
            });

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "wwwroot";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseReactDevelopmentServer(npmScript: "develop");
            //    }
            //});

            app.UseMiddleware<ExceptionHandlingMiddleware>();

        }
    }
}
