using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyPortfolioMVC.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class ContactMeController : ControllerBase
    {
        /// <summary>
        /// Return contact info
        /// </summary>
        /// <returns></returns>
        [HttpGet("/api/[controller]/[action]")]
        public IActionResult GetContactInfo()
        {
            return Content("SendContact Executed");
        }

        [HttpPost]
        public IActionResult SendMessage(Models.SendMessageModel message)
        {
            return Ok();
        }
    }
}
