using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
       if(await UserExists(registerDto.Username))
       return BadRequest("Username already taken");
      
        using var hmac = new HMACSHA256();
        var user =  new AppUser{
            Username=registerDto.Username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        }  ;
        context.Users.Add(user);
        await context.SaveChangesAsync();

         return new UserDto
        {
        Username = user.Username,
        Token = tokenService.CreateToken(user)

        };
    }
    
    
    [HttpPost("Login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto registerDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x=>x.Username.ToLower()==registerDto.Username.ToLower());
        if(user==null)
        return Unauthorized("Invalid Username Or Password");
        using var hmac = new HMACSHA256(user.PasswordSalt);
        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
        for (int i = 0; i < computeHash.Length; i++)
        {
            if(computeHash[i]!=user.PasswordHash[i])
            {
                 return Unauthorized("Invalid Username Or Password");
                 
            }
        }

        return new UserDto
        {
        Username = user.Username,
        Token = tokenService.CreateToken(user)

        };
    }
    private async Task<bool> UserExists(string username){

return await context.Users.AnyAsync(x=>x.Username.ToLower()==username.ToLower());
    } 
    }
}
