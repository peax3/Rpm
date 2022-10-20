using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using Corper.API.Application.Queries;
using Paroo.Queries;

namespace Paroo.AutofacModules
{
      public class ApplicationModule
         : Autofac.Module
    {

        public string QueriesConnectionString { get; }

        public ApplicationModule(string qconstr)
        {
            QueriesConnectionString = qconstr;

        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new ProductQueries(QueriesConnectionString))
                .As<IProductQueries>()
                .InstancePerLifetimeScope();

            builder.Register(c => new StateQueries(QueriesConnectionString))
               .As<IStateQueries>()
               .InstancePerLifetimeScope();

            builder.Register(c => new ProfileQueries(QueriesConnectionString))
               .As<IProfileQueries>()
               .InstancePerLifetimeScope();


            builder.Register(c => new OrderQueries(QueriesConnectionString))
               .As<IOrderQueries>()
               .InstancePerLifetimeScope();
        }
    }
}
