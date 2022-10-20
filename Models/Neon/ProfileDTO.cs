using Paroo.Entities;
using System;

namespace Paroo.Models.Neon
{
    public class ProfileDTO
    {
        public string name { get; set; }
        public string email { get; set; }
        public bool active { get; set; }
        public string state { get;set;}
        public DateTime birth { get; set; }
        public int points { get; set; }
        public int balance { get; set; }
    }


   
}
