using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     
    public class BuggyController(DataContext context) : BaseApiController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "some secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = context.Users.Find(-1);
            if(thing==null)
            {
return NotFound();
            }
            return thing;
            
        }
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            //try{
string thing = context.Users.Find(-1).ToString();
            
            return thing;
            
            // catch(Exception ex){
            //     return StatusCode(500,"Computer Says No!");
            // }
            
            
            
        }
        [HttpGet("bad-request")]
        public ActionResult<AppUser> GetBadRequest()
        {
           return BadRequest("Not a good request");
            
        }
       [HttpPost("validation-error")]
        public ActionResult<bool> GetValidationError(RegisterDto registerDto)
        {
            var dt = registerDto;
            return true;
        }
    }
}
