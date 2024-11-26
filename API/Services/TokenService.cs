using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;


namespace API.Services;

public class TokenService(IConfiguration config)  : ITokenService
{
 public string CreateToken(AppUser user)
 {
    var tokenKey = config["TokenKey"]?? throw new Exception("Can not access token key from config");
    if(tokenKey.Length<64)
    throw new Exception("Token Key is not valid key");
    
    var key =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
    //claim info
    var claimList =  new List<Claim>{
        new Claim(ClaimTypes.NameIdentifier, user.Username)
    };
    //signing credentials
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
    // token Info
    var tokenDescriptor =  new SecurityTokenDescriptor{
        Subject = new ClaimsIdentity(claimList),
        Expires = DateTime.UtcNow.AddDays(8),
        SigningCredentials =  creds

    };
    // create and return token
    var tokenHandler =  new JwtSecurityTokenHandler();
    var token = tokenHandler.CreateToken(tokenDescriptor);

    return tokenHandler.WriteToken(token);
    //var key = new Symmetric new Symm(Encoding.UTF8.GetBytes(tokenKey));
    throw new NotImplementedException();
 }
}
