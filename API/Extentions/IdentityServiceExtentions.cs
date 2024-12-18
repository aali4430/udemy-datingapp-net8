using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extentions;

public static class IdentityServiceExtentions
{
 public static IServiceCollection  AddIdentityServices(this IServiceCollection services,
    IConfiguration config
    )
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options=>{
var tokenKey = config["TokenKey"]?? throw new Exception("Can not access token key from config");
options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters{
ValidateIssuerSigningKey = true,
IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
ValidateIssuer = false,
ValidateAudience = false

};
});
return services;
    }
}
