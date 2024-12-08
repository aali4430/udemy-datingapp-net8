using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    [Authorize]
    public class UsersController(IUserRepository userRepository,IMapper mapper) : BaseApiController
    {
        //private readonly DataContext _context = context;

        
        [HttpGet]
       // [Route("api/[controller]/list")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
            var users = await userRepository.GetMembersAsync();
            
            return Ok(users);
        
        }
        
        [HttpGet("{username}")] // ("{id:int}")
        //[Route("api/[controller]/{id}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username){
            var user = await userRepository.GetMebmerByUsernameAsync(username);
        if(user==null) return NotFound();
        
        

            return Ok(user);
        }
        
        [HttpPut("{username}")] // ("{id:int}")
        //[Route("api/[controller]/{id}")]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto){
            var username= User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
        if(username==null) return BadRequest("No username found in token");
        
        

            var user = await userRepository.GetUserByUsernameAsync(username);
            if(username==null) return BadRequest("No username found in db");
            
            mapper.Map(memberUpdateDto,user);
            
            if(await userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed To Save User Change.");
        }
        
        
    }
}
