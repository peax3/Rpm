using System.Threading.Tasks;
using Paroo.Models;

namespace Paroo.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
