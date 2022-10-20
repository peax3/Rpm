namespace Paroo.Models
{
    public class ParooStat
    {
        public int upload_count { get; set; }
        public int active_count { get; set; }
        public int completed_count { get; set; }
    }


    public class ProfileStat
    {
        public int total_products { get; set; }
        public int total_bids { get; set; }
        public int total_swaps { get; set; }
        public int total_favourites { get; set; }
        public int bookmarked { get;set;}
    }
}
