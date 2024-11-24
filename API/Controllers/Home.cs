using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Home : ControllerBase
    {
        [HttpGet]
        
        public ActionResult<string> IsUp()
        {
return "ok";

        }
    }
}
