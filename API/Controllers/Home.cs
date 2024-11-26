using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class Home : BaseApiController
    {
        [HttpGet]
        
        public ActionResult<string> IsUp()
        {
return "ok";

        }
    }
}
