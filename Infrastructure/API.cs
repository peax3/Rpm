using System;

namespace Paroo.Infrastructure
{
    public static class API
    {
        public static Uri GetUrl(string baseUri, string version, string controllerName, string path)
        {
            return new Uri($"{baseUri}/api/{version}/{controllerName}/{path}");
        }
    }
}
