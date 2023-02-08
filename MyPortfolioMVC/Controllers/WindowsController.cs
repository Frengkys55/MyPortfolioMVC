using Microsoft.AspNetCore.Mvc;

namespace MyPortfolioMVC.Controllers
{
    public class WindowsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
